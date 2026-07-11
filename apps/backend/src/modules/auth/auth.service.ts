import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        profile: {
          create: {
            headline: `${dto.primaryRole} at MedConnect AI`,
            country: "Unknown",
          },
        },
        userRoles: {
          create: {
            role: dto.primaryRole,
          },
        },
      },
      include: { userRoles: true },
    });

    return this.signTokens(
      user.id,
      user.email,
      user.userRoles.map((r) => r.role),
    );
  }

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { userRoles: true },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.signTokens(
      user.id,
      user.email,
      user.userRoles.map((r) => r.role),
    );
  }

  private async signTokens(
    userId: string,
    email: string,
    roles: string[],
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email, roles };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "15m",
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }
}

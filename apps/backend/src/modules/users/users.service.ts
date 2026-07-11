import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException("Profile not found");
    }
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.profile.upsert({
      where: { userId },
      update: dto,
      create: {
        userId,
        country: dto.country ?? "Unknown",
        city: dto.city,
        headline: dto.headline,
        biography: dto.biography,
      },
    });
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(
    @Body() dto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.register(dto);
  }

  @Post("login")
  login(
    @Body() dto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Req() req: { user: unknown }): unknown {
    return req.user;
  }
}

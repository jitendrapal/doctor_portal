import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me/profile")
  getMyProfile(@Req() req: { user: { userId: string } }) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch("me/profile")
  updateMyProfile(
    @Req() req: { user: { userId: string } },
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.userId, dto);
  }
}

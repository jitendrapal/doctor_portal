import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FeedService } from "./feed.service";
import { CreatePostDto } from "./dto/create-post.dto";

@ApiTags("feed")
@Controller("feed")
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("posts")
  createPost(
    @Req() req: { user: { userId: string } },
    @Body() dto: CreatePostDto,
  ) {
    return this.feedService.createPost(req.user.userId, dto);
  }

  @Get("posts")
  getFeed(@Query("page") page = "1", @Query("limit") limit = "20") {
    return this.feedService.getFeed(Number(page), Number(limit));
  }
}

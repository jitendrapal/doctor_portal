import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AiService } from "./ai.service";

@ApiTags("ai")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("summarize-post")
  summarizePost(@Body() body: { content: string }) {
    return this.aiService.summarizePost(body.content ?? "");
  }

  @Post("generate-post")
  generatePost(@Body() body: { topic: string }) {
    return this.aiService.generateMedicalPost(
      body.topic ?? "healthcare innovation",
    );
  }
}

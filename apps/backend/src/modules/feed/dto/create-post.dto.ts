import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  visibility?: string;
}

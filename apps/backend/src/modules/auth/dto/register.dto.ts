import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { AppRole } from "src/common/enums/roles.enum";

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @IsString()
  lastName!: string;

  @ApiProperty({ enum: AppRole })
  @IsEnum(AppRole)
  primaryRole!: AppRole;
}

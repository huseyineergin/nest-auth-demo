import { IsOptional, IsString } from "class-validator";

export class PlatformFilterDto {
  @IsOptional()
  @IsString()
  category?: string;
}

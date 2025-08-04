import { IsOptional, IsString } from "class-validator";

export class GenreFilterDto {
  @IsOptional()
  @IsString()
  category?: string;
}

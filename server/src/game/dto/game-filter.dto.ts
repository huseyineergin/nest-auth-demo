import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class GameFilterDto {
  @IsOptional()
  @IsArray({ message: "Genres must be an array." })
  @IsString({ each: true, message: "Each genre value must be a string." })
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value === "string") {
      return value.split(",");
    }
    return value;
  })
  genres?: string[];

  @IsOptional()
  @IsArray({ message: "Platforms must be an array." })
  @IsString({ each: true, message: "Each platform value must be a string." })
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value === "string") {
      return value.split(",");
    }
    return value;
  })
  platforms?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Minimum Metascore must be a number." })
  @Min(0, { message: "Minimum Metascore cannot be less than 0." })
  @Max(100, { message: "Minimum Metascore cannot be more than 100." })
  minMetascore?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Maximum Metascore must be a number." })
  @Min(0, { message: "Maximum Metascore cannot be less than 0." })
  @Max(100, { message: "Maximum Metascore cannot be more than 100." })
  maxMetascore?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Minimum user score must be a number." })
  @Min(0, { message: "Minimum user score cannot be less than 0." })
  @Max(10, { message: "Minimum user score cannot be more than 10." })
  minUserScore?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Maximum user score must be a number." })
  @Min(0, { message: "Maximum user score cannot be less than 0." })
  @Max(10, { message: "Maximum user score cannot be more than 10." })
  maxUserScore?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Minimum year must be an integer." })
  minYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Maximum year must be an integer." })
  maxYear?: number;
}

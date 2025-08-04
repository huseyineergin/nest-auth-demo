import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateGameDto {
  @IsString({ message: "Game name must be a string." })
  @IsNotEmpty({ message: "Game name is required." })
  name: string;

  @IsString({ message: "Game description must be a string." })
  @IsNotEmpty({ message: "Game description is required." })
  description: string;

  @IsDateString({ strict: true }, { message: "Release date format must be YYYY-MM-DD." })
  releaseDate: string;

  @IsNumber({}, { message: "Metascore must be a number." })
  @Type(() => Number)
  metascore: number;

  @IsNumber({}, { message: "User score must be a number." })
  @Type(() => Number)
  userScore: number;

  @IsString({ message: "Developer name must be a string." })
  @IsNotEmpty({ message: "Developer name is required." })
  developer: string;

  @IsString({ message: "Publisher name must be a string." })
  @IsNotEmpty({ message: "Publisher name is required." })
  publisher: string;

  @IsArray({ message: "Genre ID's must be an array." })
  @ArrayNotEmpty({ message: "Genre ID's are required." })
  @IsUUID("all", { each: true, message: "Each genre value must be a UUID." })
  genreIds: string[];

  @IsArray({ message: "Platform ID's must be an array." })
  @ArrayNotEmpty({ message: "Platform ID's are required." })
  @IsUUID("all", { each: true, message: "Each platform value must be a UUID." })
  platformIds: string[];
}

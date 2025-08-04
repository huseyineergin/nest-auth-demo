import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto {
  @IsString({ message: "Genre name must be a string." })
  @IsNotEmpty({ message: "Genre name is required." })
  name: string;

  @IsString({ message: "Genre category must be a string." })
  @IsNotEmpty({ message: "Genre category is required." })
  category: string;
}

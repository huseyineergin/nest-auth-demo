import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlatformDto {
  @IsString({ message: "Platform name must be a string." })
  @IsNotEmpty({ message: "Platform name is required." })
  name: string;

  @IsString({ message: "Platform category must be a string." })
  @IsNotEmpty({ message: "Platform category is required." })
  category: string;
}

import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
  @IsString({ message: "Username must be a string." })
  @IsNotEmpty({ message: "Username is required." })
  username: string;

  @IsString({ message: "Password must be a string." })
  @IsNotEmpty({ message: "Password is required." })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
    },
    {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  )
  password: string;
}

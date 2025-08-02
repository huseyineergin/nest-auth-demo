import { Body, Controller, Post } from "@nestjs/common";
import { ResponseMessage } from "src/common/decorators/response-message.decorator";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @ResponseMessage("Signed up successfully.")
  async signUp(@Body() dto: SignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Post("sign-in")
  @ResponseMessage("Signed in successfully.")
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }
}

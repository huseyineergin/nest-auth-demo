import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";
import { UserService } from "src/user/user.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(dto: SignUpDto) {
    const { username, password } = dto;

    const existingUser = await this.userService.findByUsername(username);

    if (existingUser) {
      throw new ConflictException("Username is already in use.");
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await this.userService.create(username, hashedPassword);

    return { ...newUser };
  }

  async signIn(dto: SignInDto) {
    const { username, password } = dto;

    const existingUser = await this.userService.findByUsername(username);

    if (!existingUser) {
      throw new UnauthorizedException("Incorrect email or password.");
    }

    if (!(await argon2.verify(existingUser.password, password))) {
      throw new UnauthorizedException("Incorrect email or password.");
    }

    return { ...existingUser };
  }
}

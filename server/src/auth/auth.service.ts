import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as argon2 from "argon2";
import { UserService } from "src/user/user.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { JwtPayload } from "./types/jwt-payload.type";

@Injectable()
export class AuthService {
  private readonly accessTokenSecret: string;
  private readonly accessTokenExpiresInMs: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    this.accessTokenSecret = this.configService.getOrThrow<string>("JWT_AT_SECRET");
    this.accessTokenExpiresInMs = Number(this.configService.get<number>("JWT_AT_EXPIRES_IN_MS")) || 900_000;
  }

  async signUp(dto: SignUpDto) {
    const { username, password } = dto;

    const existingUser = await this.userService.findByUsername(username);

    if (existingUser) {
      throw new ConflictException("Username is already in use.");
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await this.userService.create(username, hashedPassword);

    const accessToken = await this.generateToken(newUser);

    return { accessToken };
  }

  async signIn(dto: SignInDto) {
    const { username, password } = dto;

    const existingUser = await this.userService.findByUsername(username);

    if (!existingUser) {
      throw new UnauthorizedException("Incorrect username or password.");
    }

    if (!(await argon2.verify(existingUser.password, password))) {
      throw new UnauthorizedException("Incorrect username or password.");
    }

    const accessToken = await this.generateToken(existingUser);

    return { accessToken };
  }

  private async generateToken(user: User) {
    const payload: JwtPayload = { sub: user.id, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: `${this.accessTokenExpiresInMs}ms`,
      secret: this.accessTokenSecret,
    });

    return accessToken;
  }
}

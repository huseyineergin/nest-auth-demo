import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, "jwt-access") {
  constructor(private readonly configService: ConfigService) {
    const accessTokenSecret = configService.get<string>("JWT_AT_SECRET") || "secret";

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessTokenSecret,
    });
  }

  validate(payload: JwtPayload) {
    return { ...payload };
  }
}

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy],
})
export class AuthModule {}

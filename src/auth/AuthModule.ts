import { Module } from "@nestjs/common";
import { AuthService } from "./service/AuthService";
import { IPasswordEncoder } from "./service/IPasswordEncoder";
import { BcryptPasswordEncoder } from "./service/BcryptPasswordEncoder";
import { DatabaseModule } from "../database/DatabaseModule";
import { UsersModule } from "../users/UsersModule";
import { AuthController } from "./controller/AuthController";
import { CustomJwtModule } from "./CustomJwtModule";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule, DatabaseModule, UsersModule, CustomJwtModule],
  providers: [
    AuthService,
    { provide: IPasswordEncoder, useClass: BcryptPasswordEncoder }
  ],
  controllers: [AuthController]
})
export class AuthModule {}

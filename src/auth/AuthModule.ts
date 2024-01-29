import {Module} from "@nestjs/common";
import {AuthService} from "./AuthService";
import {IPasswordEncoder} from "./IPasswordEncoder";
import {BcryptPasswordEncoder} from "./BcryptPasswordEncoder";
import {DatabaseModule} from "../database/database.module";
import {UsersModule} from "../users/UsersModule";
import {IJwtService} from "./IJwtService";
import {CustomJwtService} from "./CustomJwtService";
import {AuthController} from "./AuthController";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [DatabaseModule, UsersModule, JwtModule],
  providers: [
    AuthService,
    {provide: IPasswordEncoder, useClass: BcryptPasswordEncoder},
    {provide: IJwtService, useClass: CustomJwtService}
  ],
  controllers: [AuthController],
  exports: [
    {provide: IPasswordEncoder, useClass: BcryptPasswordEncoder},
    {provide: IJwtService, useClass: CustomJwtService}
  ]
})
export class AuthModule {
}

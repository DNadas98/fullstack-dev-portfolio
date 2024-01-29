import {Module} from "@nestjs/common";
import {AuthService} from "./AuthService";
import {IPasswordEncoder} from "./IPasswordEncoder";
import {BcryptPasswordEncoder} from "./BcryptPasswordEncoder";
import {DatabaseModule} from "../database/database.module";
import {UsersModule} from "../users/UsersModule";
import {AuthController} from "./AuthController";
import {CustomJwtModule} from "./CustomJwtModule";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule, DatabaseModule, UsersModule, CustomJwtModule],
  providers: [
    AuthService,
    {provide: IPasswordEncoder, useClass: BcryptPasswordEncoder}
  ],
  controllers: [AuthController]
})
export class AuthModule {
}

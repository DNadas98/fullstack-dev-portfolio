import {Module} from "@nestjs/common";
import {AuthService} from "./service/AuthService";
import {DatabaseModule} from "../database/DatabaseModule";
import {UsersModule} from "../users/UsersModule";
import {AuthController} from "./controller/AuthController";
import {CustomJwtModule} from "./CustomJwtModule";
import {ConfigModule} from "@nestjs/config";
import {PasswordEncoderModule} from "./PasswordEncoderModule";
import {ConverterModule} from "../common/converter/ConverterModule";

@Module({
  imports: [
    ConfigModule, DatabaseModule, ConverterModule, UsersModule,
    CustomJwtModule, PasswordEncoderModule
  ],
  providers: [
    AuthService
  ],
  controllers: [AuthController]
})
export class AuthModule {
}

import {Module} from "@nestjs/common";
import {AuthService} from "./AuthService";
import {IPasswordEncoder} from "./IPasswordEncoder";
import {BcryptPasswordEncoder} from "./BcryptPasswordEncoder";
import {DatabaseModule} from "../database/database.module";
import {UsersModule} from "../users/UsersModule";

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [AuthService, {provide: IPasswordEncoder, useClass: BcryptPasswordEncoder}],
  exports: [{provide: IPasswordEncoder, useClass: BcryptPasswordEncoder}]
})
export class AuthModule {
}

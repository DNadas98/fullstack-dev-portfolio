import {Module} from "@nestjs/common";
import {AuthService} from "./AuthService";
import {IPasswordEncoder} from "./IPasswordEncoder";
import {BcryptPasswordEncoder} from "./BcryptPasswordEncoder";

@Module({
  providers: [AuthService, {provide: IPasswordEncoder, useClass: BcryptPasswordEncoder}],
  exports: [BcryptPasswordEncoder]
})
export class AuthModule {
}

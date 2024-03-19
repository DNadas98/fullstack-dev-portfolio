import {Module} from "@nestjs/common";
import {IPasswordEncoder} from "./service/IPasswordEncoder";
import {BcryptPasswordEncoder} from "./service/BcryptPasswordEncoder";

@Module({
  providers: [{ provide: IPasswordEncoder, useClass: BcryptPasswordEncoder }],
  exports: [{ provide: IPasswordEncoder, useClass: BcryptPasswordEncoder }]
})
export class PasswordEncoderModule {}

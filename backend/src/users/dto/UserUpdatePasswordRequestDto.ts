import { Matches } from "class-validator";
import { passwordRegex } from "../../common/validator/validator";

export class UserUpdatePasswordRequestDto {
  @Matches(passwordRegex, { message: "Invalid password format" })
  readonly password: string;

  constructor(password: string) {
    this.password = password;
  }
}

import {Matches} from "class-validator";
import {passwordRegex} from "../../common/regex/regex";

export class UserUpdatePasswordRequestDto {
  @Matches(passwordRegex, {message: "Invalid password format"})
  readonly password: string;

  constructor(password: string) {
    this.password = password;
  }
}

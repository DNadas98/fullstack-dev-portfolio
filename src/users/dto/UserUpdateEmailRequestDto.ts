import {Matches} from "class-validator";
import {emailRegex} from "../../common/regex/regex";

export class UserUpdateEmailRequestDto {
  @Matches(emailRegex, {message: "Invalid e-mail address format"})
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}

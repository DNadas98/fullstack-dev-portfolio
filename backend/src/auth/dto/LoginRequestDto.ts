import {Matches} from "class-validator";
import {emailRegex, passwordRegex} from "../../common/validator/validator";

export class LoginRequestDto {
  @Matches(emailRegex, {message: "Invalid email format"})
  readonly email: string;

  @Matches(passwordRegex, {message: "Invalid password format"})
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

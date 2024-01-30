import { Matches } from "class-validator";
import { emailRegex, passwordRegex } from "../../common/regex/regex";

export class LoginRequestDto {
  @Matches(emailRegex, { message: "Invalid email format" })
  readonly email: string;

  @Matches(passwordRegex, { message: "Invalid password format" })
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

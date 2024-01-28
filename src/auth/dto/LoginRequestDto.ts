import {Matches} from "class-validator";
import {emailRegex, passwordRegex} from "../../regex/regex";

export class LoginRequestDto {
  @Matches(emailRegex, {message: "Invalid email format"})
  private readonly _email: string;

  @Matches(passwordRegex, {message: "Invalid password format"})
  private readonly _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}

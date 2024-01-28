import {Matches} from "class-validator";
import {emailRegex, passwordRegex, usernameRegex} from "../../regex/regex";

export class UserCreateRequestDto {
  @Matches(emailRegex, {message: "Invalid email format"})
  private readonly _email: string;

  @Matches(passwordRegex, {message: "Invalid password format"})
  private readonly _password: string;

  @Matches(usernameRegex, {message: "Invalid username format"})
  private readonly _username: string;

  constructor(email: string, password: string, username: string) {
    this._email = email;
    this._password = password;
    this._username = username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get username(): string {
    return this._username;
  }
}

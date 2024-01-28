import {Matches} from "class-validator";
import {usernameRegex} from "../../regex/regex";

export class UserUpdateRequestDto {
  @Matches(usernameRegex, {message: "Invalid username format"})
  private readonly _username: string;

  constructor(username: string) {
    this._username = username;
  }

  get username(): string {
    return this._username;
  }
}

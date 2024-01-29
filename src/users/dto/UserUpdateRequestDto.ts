import {Matches} from "class-validator";
import {usernameRegex} from "../../regex/regex";

export class UserUpdateRequestDto {
  @Matches(usernameRegex, {message: "Invalid username format"})
  readonly username: string;

  constructor(username: string) {
    this.username = username;
  }
}

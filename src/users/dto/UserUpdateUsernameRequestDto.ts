import {Matches} from "class-validator";
import {usernameRegex} from "../../common/validator/validator";

export class UserUpdateUsernameRequestDto {
  @Matches(usernameRegex, {message: "Invalid username format"})
  readonly username: string;

  constructor(username: string) {
    this.username = username;
  }
}

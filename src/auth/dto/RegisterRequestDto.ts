import {Matches} from "class-validator";
import {
  emailRegex,
  passwordRegex,
  usernameRegex
} from "../../common/validator/validator";

export class RegisterRequestDto {
  @Matches(emailRegex, {message: "Invalid e-mail address format"})
  readonly email: string;

  @Matches(passwordRegex, {message: "Invalid password format"})
  readonly password: string;

  @Matches(usernameRegex, {message: "Invalid username format"})
  readonly username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

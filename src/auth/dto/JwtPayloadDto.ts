import {Matches} from "class-validator";
import {emailRegex} from "../../regex/regex";

export class JwtPayloadDto {
  @Matches(emailRegex, {message: "Invalid credentials"})
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}

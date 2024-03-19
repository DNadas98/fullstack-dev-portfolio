import {UnauthorizedException} from "@nestjs/common";

export class InvalidCredentialsError extends UnauthorizedException {
  constructor(
    message: string = "The provided account credentials are invalid."
  ) {
    super(message);
  }
}

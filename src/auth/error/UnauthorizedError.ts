import {UnauthorizedException} from "@nestjs/common";

export class UnauthorizedError extends UnauthorizedException {
  constructor(message: string = "Unauthorized") {
    super(message);
  }
}

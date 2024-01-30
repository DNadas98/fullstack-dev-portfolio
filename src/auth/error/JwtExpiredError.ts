import { ForbiddenException } from "@nestjs/common";

export class JwtExpiredError extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}

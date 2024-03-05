import { ForbiddenException } from "@nestjs/common";

export class AccountDeactivatedError extends ForbiddenException {
  constructor(message: string = "User account has been deactivated.") {
    super(message);
  }
}

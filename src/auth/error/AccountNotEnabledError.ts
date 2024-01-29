import {ForbiddenException} from "@nestjs/common";

export class AccountNotEnabledError extends ForbiddenException {
  constructor(message: string = "User account is not enabled yet.") {
    super(message);
  }
}

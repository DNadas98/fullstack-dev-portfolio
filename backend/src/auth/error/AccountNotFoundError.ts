import { NotFoundException } from "@nestjs/common";

export class AccountNotFoundError extends NotFoundException {
  constructor() {
    super("User account with the provided credentials was not found");
  }
}

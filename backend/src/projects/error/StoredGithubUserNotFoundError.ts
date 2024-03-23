import { NotFoundException } from "@nestjs/common";

export class StoredGithubUserNotFoundError extends NotFoundException {
  constructor(
    message: string = "Github user account with the provided details was not found"
  ) {
    super(message);
  }
}

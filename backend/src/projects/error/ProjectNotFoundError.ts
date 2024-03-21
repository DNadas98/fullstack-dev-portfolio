import { NotFoundException } from "@nestjs/common";

export class ProjectNotFoundError extends NotFoundException {
  constructor(
    message: string = "Project with the provided details was not found"
  ) {
    super(message);
  }
}

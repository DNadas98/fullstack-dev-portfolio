import { NotFoundException } from "@nestjs/common";

export class CodeSnippetNotFoundError extends NotFoundException {
  constructor(
    message: string = "Code snippet with the provided details was not found"
  ) {
    super(message);
  }
}

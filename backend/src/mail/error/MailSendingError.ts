import { InternalServerErrorException } from "@nestjs/common";

export class MailSendingError extends InternalServerErrorException {
  constructor(message: string = "Failed to send e-mail") {
    super(message);
  }
}

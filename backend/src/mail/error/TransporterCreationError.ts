import {InternalServerErrorException} from "@nestjs/common";

export class TransporterCreationError extends InternalServerErrorException {
  constructor(e: Error) {
    super(`Failed to configure SMTP, ${e}`);
  }
}

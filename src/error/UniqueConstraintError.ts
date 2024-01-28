import {CustomError} from "./CustomError";

export class UniqueConstraintError extends CustomError {

  constructor(message: string) {
    super(message, 409);
  }
}

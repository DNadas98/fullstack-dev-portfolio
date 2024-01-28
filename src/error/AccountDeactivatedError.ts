import {CustomError} from "./CustomError";

export class AccountDeactivatedError extends CustomError {
  constructor(message: string = "User account has been deactivated.") {
    super(message, 403);
  }
}

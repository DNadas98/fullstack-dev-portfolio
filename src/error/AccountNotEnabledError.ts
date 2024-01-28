import {CustomError} from "./CustomError";

export class AccountNotEnabledError extends CustomError {
  constructor(message: string = "User account is not enabled yet.") {
    super(message, 403);
  }
}

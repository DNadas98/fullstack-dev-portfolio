import {CustomError} from "./CustomError";

export class AccountNotFoundError extends CustomError {
  constructor() {
    super("User account with the provided credentials was not found", 401);
  }
}

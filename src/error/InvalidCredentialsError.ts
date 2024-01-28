import {CustomError} from "./CustomError";

export class InvalidCredentialsError extends CustomError {
  constructor(message: string = "The provided account credentials are invalid.") {
    super(message, 401);
  }
}

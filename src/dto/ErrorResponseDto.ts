export class ErrorResponseDto {
  readonly error: string;

  constructor(errorMessage: string) {
    this.error = errorMessage;
  }
}

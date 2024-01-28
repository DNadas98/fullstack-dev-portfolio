export abstract class CustomError extends Error{
  private readonly _status:number;

  protected constructor(message: string, status: number) {
    super(message);
    this._status = status;
  }

  get status(): number {
    return this._status;
  }
}

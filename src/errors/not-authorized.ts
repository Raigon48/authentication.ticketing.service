import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}

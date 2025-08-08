import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Validation Error");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((e) => {
      if (e.type == "field") {
        return { message: e.msg, field: e.path };
      }
      return { message: e.msg };
    });
    return formattedErrors;
  }
}

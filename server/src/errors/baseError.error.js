export class BaseError extends Error {
  constructor(name, code, description, isOperational) {
    super(description);

    this.name = name;
    this.code = code;
    this.isOperational = isOperational;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }

  code() {
    return this.code;
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

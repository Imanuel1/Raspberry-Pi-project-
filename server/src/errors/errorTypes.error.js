import { BaseError } from "./baseError.error";
import {
  FORBIDDEN,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER,
} from "./httpsStatusCodes.json";

export class ForbiddenError extends BaseError {
  constructor(httpCode = FORBIDDEN, description, isOperational = true) {
    super("FORBIDDEN ERROR", httpCode, description, isOperational);
  }
}

export class NotFound extends BaseError {
  constructor(httpCode = NOT_FOUND, description, isOperational = true) {
    super("NOT FOUND", httpCode, description, isOperational);
  }
}

export class BadRequest extends BaseError {
  constructor(httpCode = BAD_REQUEST, description, isOperational = true) {
    super("BAD REQUEST", httpCode, description, isOperational);
  }
}

export class InternalServer extends BaseError {
  constructor(httpCode = INTERNAL_SERVER, description, isOperational = true) {
    super("INTERNAL SERVER", httpCode, description, isOperational);
  }
}

export class GeneralError extends BaseError {
  constructor(
    name = "GENERAL ERROR",
    httpCode,
    description,
    isOperational = true
  ) {
    super(name, httpCode, description, isOperational);
  }
}

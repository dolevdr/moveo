export class InputError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InputError.prototype);
  }
}

export class NotFoundError extends Error {
  status = 404;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends Error {
  status = 401;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

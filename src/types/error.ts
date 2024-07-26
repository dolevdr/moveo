export class InputError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InputError.prototype);
  }
}

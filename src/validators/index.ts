import { NextFunction, Request, Response } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";
import { InputError } from "../types/error";

export function validate(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validationChain = checkSchema(schema);
    await validationChain.run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new InputError(JSON.stringify(errors.array()));
      next(error);
    }
    next();
  };
}

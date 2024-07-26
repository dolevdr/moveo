import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if ("status" in error) {
    return res.status(error.status).send(error.message);
  }
  return res.status(500).send("Internal server error");
};

export default errorHandler;

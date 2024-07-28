import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { configs } from "../utils/config";

const noJWTRoutes = ["/api/users"];

export async function extractUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!noJWTRoutes.includes(req.path)) {
      const token = req.headers.authorization;
      jwt.verify(token, configs.jwtKey, (err, decoded) => {
        if (err) {
          return null;
        }
        req.user = { id: decoded.toString() };
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

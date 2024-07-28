import { UserToken } from "../user";

declare module "express-serve-static-core" {
  interface Request {
    user: UserToken;
  }
}

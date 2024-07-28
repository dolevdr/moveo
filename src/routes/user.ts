import { Router } from "express";
import jwt from "jsonwebtoken";
import { configs } from "../utils/config";

const userRouter = Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const { id } = req.body;
    jwt.sign(
      id,
      configs.jwtKey,
      {
        algorithm: "HS256",
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.send(token);
      }
    );
  } catch (error) {
    next(error);
  }
});
export default userRouter;

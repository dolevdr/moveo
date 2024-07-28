import { Router } from "express";
import projectRouter from "./project";
import taskRouter from "./task";
import userRouter from "./user";

const routes = Router();

routes.use("/project", projectRouter);
routes.use("/task", taskRouter);
routes.use("/user", userRouter);

export default routes;

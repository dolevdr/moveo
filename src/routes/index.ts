import { Router } from "express";
import projectRouter from "./project";
import taskRouter from "./task";

const routes = Router();

routes.use("/project", projectRouter);
routes.use("/task", taskRouter);

export default routes;

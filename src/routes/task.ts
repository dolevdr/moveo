import { Router } from "express";
import { validateDelete } from "../validators/common";
import { validateCreateTask } from "../validators/task";

const taskRouter = Router();

taskRouter.get("/", (req, res) => {
  res.send("Hello from task route");
});

taskRouter.post("/", validateCreateTask, async (req, res) => {
  const { tasks } = req.body;
});

taskRouter.delete("/", validateDelete, async (req, res) => {
  const { ids } = req.body;
});

taskRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
});

export default taskRouter;

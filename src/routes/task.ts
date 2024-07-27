import { Router } from "express";
import {
  createNewTasks,
  deleteTasksById,
  getTasksByPage,
  updateTaskById,
} from "../services/task";
import { validateDelete } from "../validators/common";
import { validateUpdateProject } from "../validators/project";
import { validateCreateTask } from "../validators/task";

const taskRouter = Router();

taskRouter.get("/:page", async (req, res, next) => {
  try {
    res.send(await getTasksByPage(+req.params.page));
  } catch (error) {
    next(error);
  }
});

taskRouter.post("/", validateCreateTask, async (req, res, next) => {
  try {
    const { tasks } = req.body;
    res.send(await createNewTasks(tasks));
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/", validateDelete, async (req, res, next) => {
  try {
    const { ids } = req.body;
    res.send(await deleteTasksById(ids));
  } catch (error) {
    next(error);
  }
});

taskRouter.patch("/:id", validateUpdateProject, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    res.send(await updateTaskById(+id, data));
  } catch (error) {
    next(error);
  }
});

export default taskRouter;

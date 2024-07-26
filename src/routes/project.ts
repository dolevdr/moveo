import { Router } from "express";
import {
  createNewProject,
  deleteProjectsById,
  getProjectsByPage,
  updateProjectById,
} from "../services/project";
import { validateDelete } from "../validators/common";
import {
  validateCreateProject,
  validateUpdateProject,
} from "../validators/project";

const projectRouter = Router();

projectRouter.get("/:page", async (req, res, next) => {
  try {
    const page = +req.params.page ?? 0;
    res.send(await getProjectsByPage(page));
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/", validateCreateProject, async (req, res, next) => {
  try {
    const { project, tasks } = req.body;
    res.send(await createNewProject(project, tasks));
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/", validateDelete, async (req, res, next) => {
  try {
    const { ids } = req.body;
    res.send(await deleteProjectsById(ids));
  } catch (error) {
    next(error);
  }
});

projectRouter.patch("/:id", validateUpdateProject, async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(await updateProjectById(+id, req.body));
  } catch (error) {
    next(error);
  }
});

export default projectRouter;

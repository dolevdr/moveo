import { Role } from "@prisma/client";
import { Router } from "express";
import {
  createNewProject,
  deleteProjectsById,
  getProjectsById,
  getProjectsByPage,
  updateProjectById,
} from "../services/project";
import { getUserRoleById } from "../services/user";
import { UnauthorizedError } from "../types/error";
import { validateDelete } from "../validators/common";
import {
  validateCreateProject,
  validateUpdateProject,
} from "../validators/project";

const projectRouter = Router();

projectRouter.get("/:page", async (req, res, next) => {
  try {
    const page = +req.params.page ?? 0;
    const user = await getUserRoleById(req.user.id);
    res.send(await getProjectsByPage(page, user.role));
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/", validateCreateProject, async (req, res, next) => {
  try {
    const { project, tasks } = req.body;
    const user = await getUserRoleById(req.user.id);
    if (user.role !== Role.admin || project.owner_id !== req.user.id) {
      throw new UnauthorizedError(
        "Only admin can create a project on his own id"
      );
    }
    res.send(await createNewProject(project, tasks));
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/", validateDelete, async (req, res, next) => {
  try {
    const { ids } = req.body;
    const [user, projects] = await Promise.all([
      getUserRoleById(req.user.id),
      getProjectsById(ids),
    ]);
    if (
      user.role !== Role.admin ||
      projects.some((project) => project.owner_id !== req.user.id)
    ) {
      throw new UnauthorizedError("Only admin can delete his own project");
    }
    res.send(await deleteProjectsById(ids));
  } catch (error) {
    next(error);
  }
});

projectRouter.patch("/:id", validateUpdateProject, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const user = await getUserRoleById(req.user.id);
    if (user.role !== Role.admin || data.owner_id !== req.user.id) {
      throw new UnauthorizedError("Only admin can update a project");
    }
    res.send(await updateProjectById(+id, req.body));
  } catch (error) {
    next(error);
  }
});

export default projectRouter;

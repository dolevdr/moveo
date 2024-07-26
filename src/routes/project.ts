import { Router } from "express";
import { validateDelete } from "../validators/common";
import { validateCreateProject } from "../validators/project";

const projectRouter = Router();

projectRouter.get("/", (req, res) => {
  res.send("Hello from project route");
});

projectRouter.post("/", validateCreateProject, async (req, res) => {
  const { projects } = req.body;
});

projectRouter.delete("/", validateDelete, async (req, res) => {
  const { ids } = req.body;
});

projectRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
});

export default projectRouter;

import { validate } from ".";
import { isProject, isProjectTask } from "../types/project";

export const validateCreateProject = validate({
  project: {
    in: ["body"],
    custom: {
      options: isProject,
    },
  },
  tasks: {
    in: ["body"],
    isArray: true,
    custom: {
      options: (value: unknown[]) => value.every(isProjectTask),
    },
  },
});

export const validateUpdateProject = validate({
  data: {
    in: ["body"],
    custom: {
      options: (value: unknown) =>
        typeof value !== "object" ||
        (!("name" in value) && !("description" in value)),
    },
  },
});

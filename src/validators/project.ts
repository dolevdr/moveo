import { validate } from ".";
import { isProject } from "../types/project";
import { isTask } from "../types/task";

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
      options: (value: unknown[]) => value.every(isTask),
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

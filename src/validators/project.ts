import { validate } from ".";
import { isProject } from "../types/project";

export const validateCreateProject = validate({
  projects: {
    in: ["body"],
    isArray: true,
    custom: {
      options: (value: unknown[]) => value.every(isProject),
    },
  },
});

import { validate } from ".";
import { isTask } from "../types/task";

export const validateCreateTask = validate({
  tasks: {
    in: ["body"],
    isArray: true,
    custom: {
      options: (value: unknown[]) => value.every(isTask),
    },
  },
});

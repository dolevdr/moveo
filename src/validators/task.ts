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

export const validateUpdateTask = validate({
  data: {
    in: ["body"],
    custom: {
      options: (value: unknown) =>
        typeof value !== "object" ||
        (!("title" in value) &&
          !("description" in value) &&
          !("status" in value)) ||
        "id" in value,
    },
  },
});

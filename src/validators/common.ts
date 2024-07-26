import { validate } from ".";

export const validateDelete = validate({
  ids: {
    in: ["body"],
    isArray: true,
    custom: {
      options: (value: unknown[]) =>
        value.every((id) => typeof id === "number"),
    },
  },
});

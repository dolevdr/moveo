import { Project } from "@prisma/client";

export function isProject(value: unknown): value is Project {
  return (
    !!value &&
    typeof value === "object" &&
    "name" in value &&
    typeof value.name === "string" &&
    "description" in value &&
    typeof value.description === "string"
  );
}

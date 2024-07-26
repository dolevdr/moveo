import { Status, Task } from "@prisma/client";

export function isTask(value: unknown): value is Task {
  return (
    !!value &&
    typeof value === "object" &&
    "title" in value &&
    typeof value.title === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "status" in value &&
    typeof value.status === "string" &&
    !!Status[value.status] &&
    "project_id" in value &&
    typeof value.project_id === "number"
  );
}

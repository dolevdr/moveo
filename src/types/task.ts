import { Status, Task } from "@prisma/client";

export function isTask(value: unknown): value is Task {
  return (
    !!value &&
    typeof value === "object" &&
    "name" in value &&
    typeof value.name === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "status" in value &&
    typeof value.status === "string" &&
    Status[value.status] !== undefined
  );
}

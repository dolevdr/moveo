import { Project, Role, Task } from "@prisma/client";

export function isProject(value: unknown): value is Project {
  return (
    !!value &&
    typeof value === "object" &&
    "name" in value &&
    typeof value.name === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "owner_id" in value &&
    typeof value.owner_id === "string" &&
    !!Role[value.owner_id]
  );
}

export function isProjectTask(value: unknown): value is Task {
  return (
    !!value &&
    typeof value === "object" &&
    "title" in value &&
    typeof value.title === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "status" in value &&
    typeof value.status === "string"
  );
}

export type ProjectData = Project & { tasks: Task[] };

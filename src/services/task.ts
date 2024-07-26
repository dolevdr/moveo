import { Prisma, Task } from "@prisma/client";
import {
  createTasks,
  deleteTasks,
  getTasks,
  getTasksByIds,
  updateTask,
} from "../db/task";
import { NotFoundError } from "../types/error";
import { areIdsExist } from "./project";

export async function getTasksByPage(page: number): Promise<Task[]> {
  return getTasks(page);
}

export async function getProjectsById(ids: number[]): Promise<Task[]> {
  return getTasksByIds(ids);
}

export async function createNewTasks(
  tasks: Prisma.TaskCreateManyInput[]
): Promise<Task[]> {
  const distinctIds = Array.from(
    new Set<number>(
      tasks.map((task: Prisma.TaskCreateManyInput) => task.project_id)
    )
  );
  if (!(await areIdsExist(distinctIds))) {
    throw new NotFoundError("All tasks must belong to an existing project");
  }
  return createTasks(tasks);
}

export async function updateTaskById(
  id: number,
  data: Prisma.TaskCreateManyInput
): Promise<Task> {
  const [project] = await getTasksByIds([id]);
  if (!project) {
    throw new NotFoundError("Task not found");
  }
  return updateTask(id, data);
}

export async function deleteTasksById(
  ids: number[]
): Promise<{ count: number }> {
  return deleteTasks(ids);
}

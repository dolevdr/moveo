import { Prisma, Task } from "@prisma/client";
import { executeQuery, prismaDb } from ".";
import { logger } from "../logger";

export async function getTasks(page: number): Promise<Task[]> {
  logger.debug(`Getting tasks page - ${page}`);
  const query = prismaDb.task.findMany({
    skip: page * 10,
    take: 10,
  });
  return executeQuery(query, "Error getting tasks");
}

export async function createTasks(
  data: Prisma.TaskCreateManyInput[]
): Promise<Task[]> {
  logger.debug(`Creating tasks: ${JSON.stringify(data)}`);
  const query = prismaDb.task.createManyAndReturn({ data });
  return executeQuery(query, "Error creating tasks");
}

export async function getTasksByIds(ids: number[]): Promise<Task[]> {
  logger.debug(`Getting tasks ids - ${ids}`);
  const query = prismaDb.task.findMany({ where: { id: { in: ids } } });
  return executeQuery(query, "Error getting tasks by ids");
}

export async function updateTask(
  id: number,
  data: Prisma.TaskCreateManyInput
): Promise<Task> {
  logger.debug(`Updating task id - ${id}`);
  const query = prismaDb.task.update({ where: { id }, data });
  return executeQuery(query, "Error updating task");
}

export async function deleteTasks(ids: number[]): Promise<{ count: number }> {
  logger.debug(`Deleting task id - ${ids}`);
  const query = prismaDb.task.deleteMany({ where: { id: { in: ids } } });
  return executeQuery(query, "Error deleting task");
}

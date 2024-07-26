import { Prisma, Project } from "@prisma/client";
import { executeQuery, prismaDb } from ".";
import { logger } from "../logger";

export async function createProjects(
  data: Prisma.ProjectCreateInput[]
): Promise<Project[]> {
  logger.debug(`Creating projects: ${JSON.stringify(data)}`);
  const query = prismaDb.project.createManyAndReturn({ data });
  return executeQuery(query, "Error creating projects");
}

export async function getProjectsByIds(ids: number[]): Promise<Project[]> {
  logger.debug(`Getting projects ids - ${ids}`);
  const query = prismaDb.project.findMany({ where: { id: { in: ids } } });
  return executeQuery(query, "Error getting projects by ids");
}

export async function updateProject(
  id: number,
  data: Prisma.ProjectUpdateInput
): Promise<Project> {
  logger.debug(`Updating project id - ${id}`);
  const query = prismaDb.project.update({ where: { id }, data });
  return executeQuery(query, "Error updating project");
}

export async function deleteProjects(
  ids: number[]
): Promise<{ count: number }> {
  logger.debug(`Deleting project id - ${ids}`);
  const query = prismaDb.project.deleteMany({ where: { id: { in: ids } } });
  return executeQuery(query, "Error deleting project");
}

import { Prisma, Project } from "@prisma/client";
import { executeQuery, prismaDb } from ".";
import { logger } from "../logger";
import { ProjectData } from "../types/project";
import { configs } from "../utils/config";

const { windowSize } = configs;

export async function getProjects(page: number): Promise<ProjectData[]> {
  logger.debug(`Getting projects page - ${page}`);
  const query = prismaDb.project.findMany({
    skip: page * windowSize,
    take: windowSize,
    include: { tasks: true },
  });
  return executeQuery(query, "Error getting projects");
}

export async function createProjects(
  data: Prisma.ProjectCreateInput[]
): Promise<Project[]> {
  logger.debug(`Creating projects: ${JSON.stringify(data)}`);
  const query = prismaDb.project.createManyAndReturn({ data });
  return executeQuery(query, "Error creating projects");
}

export async function getProjectsByIds(ids: number[]): Promise<ProjectData[]> {
  logger.debug(`Getting projects ids - ${ids}`);
  const query = prismaDb.project.findMany({
    where: { id: { in: ids } },
    include: { tasks: true },
  });
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

export async function areAllIdsExist(ids: number[]): Promise<boolean> {
  logger.debug(`Checking if projects exist - ${ids}`);
  const query = prismaDb.project.findMany({
    where: { AND: ids.map((id) => ({ id })) },
  });
  return executeQuery(query, "Error checking if projects exist").then(
    (projects) => projects.length === ids.length
  );
}

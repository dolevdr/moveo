import { Prisma, Project } from "@prisma/client";
import {
  areAllIdsExist,
  createProjects,
  deleteProjects,
  getProjects,
  getProjectsByIds,
  updateProject,
} from "../db/project";
import { createTasks } from "../db/task";
import { NotFoundError } from "../types/error";
import { ProjectData } from "../types/project";

export async function getProjectsByPage(page: number): Promise<ProjectData[]> {
  return getProjects(page);
}

export async function getProjectsById(ids: number[]): Promise<ProjectData[]> {
  return getProjectsByIds(ids);
}

export async function createNewProject(
  project: Prisma.ProjectCreateInput,
  tasks: Prisma.TaskCreateInput[]
): Promise<ProjectData[]> {
  const [newProject] = await createProjects([project]);
  const newTasks = await createTasks(
    tasks.map(({ title, description, status }) => ({
      title,
      description,
      status,
      project_id: newProject.id,
    }))
  );
  return [{ ...newProject, tasks: newTasks }];
}

export async function updateProjectById(
  id: number,
  data: Prisma.ProjectUpdateInput
): Promise<Project> {
  const [project] = await getProjectsById([+id]);
  if (!project) {
    throw new NotFoundError("Project not found");
  }
  return updateProject(id, data);
}

export async function deleteProjectsById(
  ids: number[]
): Promise<{ count: number }> {
  return deleteProjects(ids);
}

export async function areIdsExist(ids: number[]): Promise<boolean> {
  return areAllIdsExist(ids);
}

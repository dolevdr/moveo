import { afterEach, beforeAll, describe, expect, jest } from "@jest/globals";
import { Prisma } from "@prisma/client";
import {
  createNewProject,
  deleteProjectsById,
  getProjectsByPage,
} from "../src/services/project";
import { getUserRoleById } from "../src/services/user";
import { configs } from "../src/utils/config";

let user: any;
const id = "111111111";

describe("Project Routes", () => {
  beforeAll(async () => {
    user = await getUserRoleById(id);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /projects/:page", async () => {
    const { projectWindow } = configs;

    const response = await getProjectsByPage(0, user.role);

    expect(response.length).toBeLessThanOrEqual(projectWindow);
  });

  test("POST /projects", async () => {
    const project: Prisma.ProjectCreateManyInput = {
      name: "New Project",
      description: "New Description",
      owner_id: "111111111",
    };
    const tasks: Prisma.TaskCreateManyProjectInput[] = [
      {
        title: "New Task",
        description: "New Description",
        status: "to_do",
      },
    ];

    // const response = await axios.post(
    //   `${configs.api}/project`,
    //   {
    //     project,
    //     tasks,
    //   },
    //   {
    //     headers: {
    //       Authorization: tokenRes,
    //     },
    //   }
    // );
    const response = await createNewProject(project, tasks);

    expect(response[0].name).toBe(project.name);
    expect(response[0].description).toBe(project.description);
  });

  test("DELETE /projects", async () => {
    // save project id 15 for task creation
    const ids = Array.from({ length: 10 }, (_, i) => i + 16);

    // const response = await axios.delete(`${configs.api}/project`, {
    //   data: { ids },
    //   headers: {
    //     Authorization: tokenRes,
    //   },
    // });
    const response = await deleteProjectsById(ids);

    expect(response.count >= 0).toBeTruthy();
  });
});

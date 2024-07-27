import { Prisma } from "@prisma/client";
import axios from "axios";
import { configs } from "../src/utils/config";
describe("Project Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /projects/:page", async () => {
    const { projectWindow } = configs;

    const response = await axios.get(`${configs.api}/project/0`);

    expect(response.status).toBe(200);
    expect(response.data.length).toBeLessThanOrEqual(projectWindow);
  });

  test("POST /projects", async () => {
    const project: Prisma.ProjectCreateInput = {
      name: "New Project",
      description: "New Description",
    };
    const tasks: Prisma.TaskCreateManyProjectInput[] = [
      {
        title: "New Task",
        description: "New Description",
        status: "to_do",
      },
    ];
    const response = await axios.post(`${configs.api}/project`, {
      project,
      tasks,
    });

    expect(response.status).toBe(200);
    expect(response.data[0].name).toEqual(project.name);
    expect(response.data[0].description).toEqual(project.description);
  });

  test("DELETE /projects", async () => {
    // save project id 15 for task creation
    const ids = Array.from({ length: 10 }, (_, i) => i + 16);

    const response = await axios.delete(`${configs.api}/project`, {
      data: { ids },
    });

    expect(response.status).toBe(200);
    expect(response.data.count >= 0).toBeTruthy();
  });
});

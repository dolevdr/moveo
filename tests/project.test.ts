import { Prisma } from "@prisma/client";
import axios from "axios";
import { configs } from "../src/utils/config";
describe("Project Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /projects/:page", async () => {
    const { windowSize } = configs;

    const response = await axios.get(`${configs.api}/project/0`);

    expect(response.status).toBe(200);
    expect(response.data.length <= windowSize).toBeTruthy();
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
    const ids = [1, 2, 3];

    const response = await axios.delete(`${configs.api}/project`, {
      data: { ids },
    });

    expect(response.status).toBe(200);
    expect(response.data.count >= 0).toBeTruthy();
  });

  //   test("PATCH /projects/:id", async () => {
  //     const mockUpdatedProject = { id: 1, name: "Updated Project" };
  //     (updateProjectById as jest.Mock).mockResolvedValue(mockUpdatedProject);

  //     const response = await request(app)
  //       .patch("/projects/1")
  //       .send({ name: "Updated Project" });

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(mockUpdatedProject);
  //     expect(updateProjectById).toHaveBeenCalledWith(1, {
  //       name: "Updated Project",
  //     });
  //   });
});

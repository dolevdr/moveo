import { Prisma } from "@prisma/client";
import axios from "axios";
import { configs } from "../src/utils/config";

describe("Task Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /task/:page", async () => {
    const { taskWindow } = configs;

    const response = await axios.get(`${configs.api}/task/0`);

    expect(response.status).toBe(200);
    expect(response.data.length).toBeLessThanOrEqual(taskWindow);
  });

  test("POST /task", async () => {
    // Test the POST /tasks route
    const newTask: Prisma.TaskCreateManyInput = {
      title: "New Task",
      description: "New Description",
      status: "to_do",
      project_id: 15,
    };

    const response = await axios.post(`${configs.api}/task`, {
      tasks: [newTask],
    });

    expect(response.status).toBe(200);
    expect(response.data[0].title).toEqual(newTask.title);
    expect(response.data[0].description).toEqual(newTask.description);
    expect(response.data[0].status).toEqual(newTask.status);
    expect(response.data[0].project_id).toEqual(newTask.project_id);
  });

  test("DELETE /tasks", async () => {
    const ids = Array.from({ length: 15 }, (_, i) => i + 15);

    const response = await axios.delete(`${configs.api}/task`, {
      data: { ids },
    });

    expect(response.status).toBe(200);
    expect(response.data.count).toBeGreaterThanOrEqual(0);
  });
});

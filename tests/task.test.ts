import { Prisma } from "@prisma/client";
import {
  createNewTasks,
  deleteTasksById,
  getTasksByPage,
} from "../src/services/task";
import { getUserRoleById } from "../src/services/user";
import { configs } from "../src/utils/config";

let user: any;
const id = "111111111";
describe("Task Routes", () => {
  beforeAll(async () => {
    user = await getUserRoleById(id);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /task/:page", async () => {
    const { taskWindow } = configs;

    const response = await getTasksByPage(0);

    expect(response.length).toBeLessThanOrEqual(taskWindow);
  });

  test("POST /task", async () => {
    // Test the POST /tasks route
    const newTask: Prisma.TaskCreateManyInput = {
      title: "New Task",
      description: "New Description",
      status: "to_do",
      project_id: 15,
    };

    const response = await createNewTasks([newTask]);

    expect(response[0].title).toBe(newTask.title);
    expect(response[0].description).toBe(newTask.description);
    expect(response[0].status).toBe(newTask.status);
    expect(response[0].project_id).toBe(newTask.project_id);
  });

  test("DELETE /tasks", async () => {
    const ids = Array.from({ length: 15 }, (_, i) => i + 15);

    const response = await deleteTasksById(ids);

    expect(response.count).toBeGreaterThanOrEqual(0);
  });
});

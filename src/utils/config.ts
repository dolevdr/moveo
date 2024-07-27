import { config } from "dotenv";
import * as env from "env-var";

config();

export const configs = {
  port: env.get("PORT").default("8000").asPortNumber(),
  api: env.get("API").required().asString(),
  taskWindow: env.get("TASK_WINDOW_SIZE").default("10").asIntPositive(),
  projectWindow: env.get("PROJECT_WINDOW_SIZE").default("10").asIntPositive(),
};

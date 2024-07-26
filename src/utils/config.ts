import { config } from "dotenv";
import * as env from "env-var";

config();

export const configs = {
  port: env.get("PORT").default("8000").asPortNumber(),
  api: env.get("API").required().asString(),
  windowSize: env.get("WINDOW_SIZE").default("10").asIntPositive(),
};

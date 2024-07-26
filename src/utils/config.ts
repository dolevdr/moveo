import { config } from "dotenv";
import * as env from "env-var";

config();

export const configs = {
  port: env.get("PORT").default("8000").asPortNumber(),
  clientURL: env.get("CLIENT_URL").required().asString(),
};

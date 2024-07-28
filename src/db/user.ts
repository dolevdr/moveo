import { User } from "@prisma/client";
import { executeQuery, prismaDb } from ".";
import { logger } from "../logger";

export async function getUserRole(id: string): Promise<User> {
  logger.debug(`Getting user role for user ${id}`);
  const query = prismaDb.user.findUnique({ where: { id } });
  return executeQuery(query, "Error getting user role");
}

export async function upsertUser(id: string): Promise<User> {
  logger.debug(`Upserting user ${id}`);
  const query = prismaDb.user.upsert({
    where: { id },
    update: {},
    create: { id },
  });
  return executeQuery(query, "Error upserting user");
}

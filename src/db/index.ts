import { PrismaClient, PrismaPromise } from "@prisma/client";
import { logger } from "../logger";

export const prismaDb = new PrismaClient();

export async function executeQuery<T>(
  query: PrismaPromise<T>,
  errmsg: string = ""
): Promise<T> {
  try {
    await prismaDb.$connect();
    return await query;
  } catch (error) {
    logger.error(errmsg);
    throw error;
  } finally {
    prismaDb.$disconnect();
  }
}

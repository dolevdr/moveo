import { User } from "@prisma/client";
import { getUserRole, upsertUser } from "../db/user";

export async function getUserRoleById(id: string): Promise<User> {
  return getUserRole(id);
}

export async function upsertUserById(id: string): Promise<User> {
  return upsertUser(id);
}

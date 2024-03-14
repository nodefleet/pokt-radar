import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getAccount = cache(async (address: string) => {
  return await prisma.accounts.findFirst({ where: { address: address } });
});
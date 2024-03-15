import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getAccount = cache(async (address: string) => {
  const blocks = await prisma.blocks.findMany({
    take: 1,
    orderBy: { height: "desc" },
  });
  const account = await prisma.accounts.findMany({
    where: { address: address, height: Number(blocks[0].height) },
  });
  return account;
});

import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getBlocks = cache(async ({ take }: { take: number }) => {
  return await prisma.blocks.findMany({
    take,
    orderBy: { block_height: "desc" },
  });
});

export const getLatestBlocks = cache(async () => {
  return await prisma.blocks.findMany({
    take: 10,
    orderBy: { block_height: "desc" },
  });
});

export const getBlock = cache(async (block: number) => {
  return await prisma.blocks.findUnique({ where: { block_height: block } });
});

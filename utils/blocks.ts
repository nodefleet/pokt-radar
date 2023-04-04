import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getLastBlockHeight = cache(async () => {
  return await prisma.blocks.findFirst({
    select: { block_height: true },
    orderBy: { block_height: "desc" },
  });
});
export const getBlocks = cache(
  async ({ take, skip }: { take: number; skip: number }) => {
    const blocks = await prisma.blocks.findMany({
      take,
      skip,
      orderBy: { block_height: "desc" },
    });
    const count = await prisma.blocks.count();
    return {
      blocks,
      count,
    };
  }
);

export const getLatestBlocks = cache(async () => {
  return await prisma.blocks.findMany({
    take: 10,
    orderBy: { block_height: "desc" },
  });
});

export const getBlock = cache(async (block: number) => {
  return await prisma.blocks.findUnique({ where: { block_height: block } });
});

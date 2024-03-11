import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getLastBlockHeight = cache(async () => {
  return await prisma.blocks.findFirst({
    select: { height: true },
    orderBy: { height: "desc" },
  });
});

export const getBlocks = cache(
  async ({ take, skip }: { take: number; skip: number }) => {
    const blocks = await prisma.blocks.findMany({
      take,
      skip,
      orderBy: { height: "desc" },
    });
    const count = await prisma.blocks.count();
    return {
      blocks,
      count,
    };
  }
);

export const getLatestBlocks = async () => {
  return await prisma.$queryRaw<any[]>`
  SELECT * FROM blocks
  ORDER BY height DESC
  LIMIT 10;
`;
};

export const getBlock = cache(async (height: number) => {
  return await prisma.blocks.findMany({ where: { height: height } });
});

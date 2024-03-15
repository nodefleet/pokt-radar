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

export const getBlock = cache(
  async ({
    take,
    skip,
    height,
  }: {
    take: number;
    skip: number;
    height: number | undefined;
  }) => {
    const blocks = await prisma.blocks.findMany({
      where: { height: height },
    });
    const transactions = await prisma.transactions.findMany({
      where: { height: height },
      take,
      skip,
      orderBy: { height: "desc" },
    });
    const count = await prisma.transactions.count({
      where: { height: height },
    });
    const result = await prisma.$queryRaw<any[]>`
    SELECT date_trunc('day', b.time) AS date, COUNT(b.height) AS count
    FROM blocks AS b
    LEFT JOIN transactions t ON t.height = b.height
    WHERE message_type ='pocketcore/claim'
    AND b.height = ${height} 
    GROUP BY date
    ORDER BY date DESC
    LIMIT 30;`;
    return {
      transations: transactions,
      block: blocks[0],
      count,
      chartData: result,
    };
  }
);

export const getBlockStats = cache(async () => {
  const result = await prisma.$queryRaw<any[]>`
    SELECT date_trunc('day', b.time) AS date, COUNT(b.height) AS count
    FROM blocks AS b
    GROUP BY date
    ORDER BY date DESC
    LIMIT 7`;
  return result;
});

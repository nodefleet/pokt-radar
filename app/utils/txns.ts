import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getTransactions = cache(
  async ({ take, block }: { take: number; block: number | undefined }) => {
    return await prisma.transactions.findMany({
      where: { block_height: block },
      take,
      orderBy: { block_height: "desc" },
      include: { blocks: { select: { time: true } } },
    });
  }
);

export const getLatestTransactions = cache(async () => {
  return await prisma.transactions.findMany({
    take: 10,
    orderBy: { block_height: "desc" },
    include: { blocks: { select: { time: true } } },
  });
});

export const getTransaction = cache(async (hash: string) => {
  return await prisma.transactions.findUnique({
    where: { hash },
    include: { blocks: { select: { time: true } } },
  });
});

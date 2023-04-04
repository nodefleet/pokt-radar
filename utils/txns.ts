import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getTotalTransactions = cache(async () => {
  return await prisma.transactions.count();
});

export const getTransactions = cache(
  async ({
    take,
    skip,
    block,
  }: {
    take: number;
    skip: number;
    block: number | undefined;
  }) => {
    const transactions = await prisma.transactions.findMany({
      where: { block_height: block },
      take,
      skip,
      orderBy: { block_height: "desc" },
      include: { blocks: { select: { time: true } } },
    });
    const count = await prisma.transactions.count({
      where: { block_height: block },
    });
    return {
      transactions,
      count,
    };
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

export const getTransactionsByAddress = cache(async (address: string) => {
  return await prisma.transactions.findMany({
    where: { OR: [{ from: address }, { to: address }] },
    include: { blocks: { select: { time: true } } },
    orderBy: { block_height: "desc" },
  });
});

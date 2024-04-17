import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getBlock = async ({
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
  const transactions = await prisma.$queryRaw<any[]>`
      SELECT *,transaction_hash as hash
      FROM transactions_30_days
      WHERE block_id = ${height}
      ORDER BY block_id DESC
      LIMIT ${take}
      OFFSET ${skip};`;
  const count = await prisma.$queryRaw<any[]>`
       SELECT COUNT(transaction_id) FROM transactions_30_days;`;
  return {
    transactions,
    block: blocks[0],
    count: Number(count[0].count),
  };
};

export const getBlockStats = async () => {
  const result = await prisma.$queryRaw<any[]>`
      SELECT date_trunc('day', b.time) AS date, COUNT(b.height) AS count
      FROM blocks AS b
      GROUP BY date
      ORDER BY date DESC
      LIMIT 7`;
  return result;
};

export const getTotalTransactions = async () => {
  return await prisma.transactions.count({});
};

export const getTransactions = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  // const transactions = await prisma.transactions.findMany({
  //   where: { height: block },
  //   take,
  //   skip,
  //   orderBy: { height: "desc" },
  // });
  const transactions = await prisma.$queryRaw<any[]>`
      SELECT * 
      FROM transactions_30_days
      WHERE transaction_id IS NOT NULL AND message_type ='pocketcore/claim'
      ORDER BY block_time DESC
      LIMIT ${take}
      OFFSET ${skip};`;
  const count = await prisma.$queryRaw<any[]>`
      SELECT COUNT(*)
      FROM transactions_30_days
      WHERE transaction_id IS NOT NULL`;
  return {
    transactions,
    count: Number(count[0].count),
  };
};

export const getTransaction = async (hash: string) => {
  const result = await prisma.$queryRaw<any[]>`
    SELECT *
    FROM transactions_30_days AS t
    LEFT JOIN blocks AS b ON t.height = b.height
    WHERE t.transaction_hash = ${hash};`;
  return {
    transation: result[0],
  };
};

export const getTransactionsByBlock = async (block: number) => {
  return await prisma.transactions.findMany({
    where: { height: block },
    orderBy: { height: "desc" },
  });
};

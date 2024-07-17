import { convertBigIntsToNumbers } from "@/utils";
import { getHome } from "@/utils/accounts";
import {
  getBlockStats,
  getLast15DayTransaction,
  getTotalTransactions,
  getTransactions,
} from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const transactions = await getTransactions({
        limit: 10,
      });
      const [blocks, countTrasaction, { dataChart }] = await Promise.all([
        getBlockStats(),
        getTotalTransactions(),
        getLast15DayTransaction(),
      ]);

      const serializedBlock = blocks.map((block: any) => {
        const serializedTransaction = convertBigIntsToNumbers(block);
        return serializedTransaction;
      });
      const serializedTransactions = transactions.map((transaction: any) => {
        const serializedTransaction = convertBigIntsToNumbers(transaction);
        return serializedTransaction;
      });

      return res.status(200).json({
        dataChart,
        txTransation: countTrasaction,
        dataBlock: serializedBlock,
        dataTrasaction: serializedTransactions,
      });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

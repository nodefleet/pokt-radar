import { convertBigIntsToNumbers } from "@/utils";
import { getHome } from "@/utils/accounts";
import {
  getBlockStats,
  getLast15DayTransaction,
  getProducer,
  getStakinPOKT,
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
      const blocks = await getBlockStats();
      const serializedBlock = blocks.map((block: any) => {
        const serializedTransaction = convertBigIntsToNumbers(block);
        return serializedTransaction;
      });
      const transactions = await getTransactions({
        limit: 10,
      });

      const serializedTransactions = transactions.map((transaction: any) => {
        const serializedTransaction = convertBigIntsToNumbers(transaction);
        return serializedTransaction;
      });

      const countTrasaction = await getTotalTransactions();
      const { dataChart } = await getLast15DayTransaction();

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

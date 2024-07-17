import { convertBigIntsToNumbers } from "@/utils";
import { getHome } from "@/utils/accounts";
import {
  getBlockStats,
  getLast15DayTransaction,
  getTotalTransactions,
  getTransactions,
  refreshMaterializedView,
} from "@/utils/prisma";
import { addDays } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};
let lastExecutionDate: Date | null = null;

const setLastExecutionDate = (date: Date) => {
  lastExecutionDate = date;
};

const getLastExecutionDate = () => lastExecutionDate;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const currentDate = new Date();
      const lastExecution = getLastExecutionDate();

      if (lastExecution && addDays(lastExecution, 2) <= currentDate) {
        await refreshMaterializedView();
        setLastExecutionDate(currentDate);
      } else if (!lastExecution) {
        setLastExecutionDate(currentDate);
      }

      const [transactions] = await Promise.all([
        getTransactions({
          limit: 10,
        }),
      ]);
      const [{ dataChart }, blocks] = await Promise.all([
        getLast15DayTransaction(),
        getBlockStats(),
      ]);

      const countTrasaction = await getTotalTransactions();

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
        txTransation: convertBigIntsToNumbers(countTrasaction),
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

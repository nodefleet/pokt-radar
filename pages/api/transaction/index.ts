import "server-only";
import { getTransaction, getTransactions } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertBigIntsToNumbers } from "@/utils";
import { getDataChart } from "@/utils/txns";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { PAGE_SIZE, hash } = req.query;
    try {
      if (hash) {
        const { transation } = await getTransaction(hash as string);
        return res
          .status(200)
          .json({ transation: convertBigIntsToNumbers(transation) });
      }

      const transactions = await getTransactions({
        limit: PAGE_SIZE ? Number(PAGE_SIZE) : 10,
      });

      const chartData = await getDataChart();

      const serializedTransactions = transactions.map((transaction) => {
        const serializedTransaction = convertBigIntsToNumbers(transaction);
        return serializedTransaction;
      });

      return res
        .status(200)
        .json({ transactions: serializedTransactions, chartData });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

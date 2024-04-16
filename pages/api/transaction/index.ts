import "server-only";
import { getTransaction, getTransactions } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

function convertBigIntsToNumbers(obj: any): any {
  if (typeof obj === "bigint") {
    return Number(obj);
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      obj[key] = convertBigIntsToNumbers(obj[key]);
    }
  }
  return obj;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { PAGE_SIZE, SKIP, hash } = req.query;
    if (PAGE_SIZE) {
      try {
        const { transactions, count: totalTxns } = await getTransactions({
          take: Number(PAGE_SIZE),
          skip: Number(SKIP),
        });

        const serializedTransactions = transactions.map((transaction) => {
          const serializedTransaction = convertBigIntsToNumbers(transaction);
          return serializedTransaction;
        });

        res
          .status(200)
          .json({ transactions: serializedTransactions, count: totalTxns });
      } catch (error) {
        console.error("Error fetching home data:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
    if (hash) {
      const { transation } = await getTransaction(hash as string);
      res.status(200).json({ transation: convertBigIntsToNumbers(transation) });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

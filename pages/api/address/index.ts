import "server-only";
import { getTransaction, getTransactions } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertBigIntsToNumbers } from "@/utils";
import { getTransactionsByAddress } from "@/utils/txns";
import { getAccount } from "@/utils/accounts";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { address, SKIP } = req.query;
    try {
      const { account, nodes, price, stake } = await getAccount(
        address as string
      );

      const { transactions } = await getTransactionsByAddress(
        address as string,
        SKIP ? Number(SKIP) : 10
      );

      const serializedTransactions = transactions.map((transaction: any) => {
        const serializedTransaction = convertBigIntsToNumbers(transaction);
        return serializedTransaction;
      });

      return res.status(200).json({
        transactions: serializedTransactions,
        account,
        nodes,
        price,
        stake,
      });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

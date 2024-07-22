import "server-only";
import { getTransactionsByAddress } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertBigIntsToNumbers } from "@/utils";
import axios from "axios";
import { getPrice } from "@/utils/accounts";

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
      const response = await axios.post(
        "http://74.118.138.104:8545",
        {
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [address],
          id: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { transactions } = await getTransactionsByAddress(
        address as string,
        SKIP ? Number(SKIP) : 10
      );
      const price = await getPrice();

      const serializedTransactions = transactions.map((transaction: any) => {
        const serializedTransaction = convertBigIntsToNumbers(transaction);
        return serializedTransaction;
      });

      return res.status(200).json({
        transactions: serializedTransactions,
        balance: response.data.result.balance,
        price: price,
      });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

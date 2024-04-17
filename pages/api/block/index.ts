import "server-only";
import { convertBigIntsToNumbers } from "@/utils";
import { getBlocks } from "@/utils/blocks";
import { getBlock } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { limit, height, skip, take } = req.query;
    try {
      if (height) {
        let { block, count, transactions } = await getBlock({
          height: Number(height),
          skip: skip ? Number(skip) : 0,
          take: take ? Number(take) : 10,
        });

        const serializedTransactions = transactions.map((transaction) => {
          const serializedTransaction = convertBigIntsToNumbers(transaction);
          return serializedTransaction;
        });
        return res.status(200).json({
          block: convertBigIntsToNumbers(block),
          count,
          transactions: serializedTransactions,
        });
      }
      const { blocks } = await getBlocks({
        limit: limit ? Number(limit) : 10,
      });

      return res.status(200).json({ blocks });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

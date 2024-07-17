import "server-only";
import { convertBigIntsToNumbers } from "@/utils";
import { getBlocks } from "@/utils/blocks";
import { getBlock, getBlockByTransaction, getBlockStats } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { block_hash, SKIP, PAGE_SIZE } = req.query;
    try {
      if (block_hash) {
        let block = await getBlock(block_hash as string);
        let transactions = await getBlockByTransaction(Number(block?.number));

        const serializedTransactions = transactions.map((block: any) => {
          const serializedTransaction = convertBigIntsToNumbers(block);
          return serializedTransaction;
        });

        return res.status(200).json({
          block: convertBigIntsToNumbers(block),
          transactions: serializedTransactions,
        });
      }
      const blocks = await getBlocks({ limit: Number(PAGE_SIZE) });

      const serializedTransactions = blocks.map((block: any) => {
        const serializedTransaction = convertBigIntsToNumbers(block);
        return serializedTransaction;
      });

      return res.status(200).json({ blocks: serializedTransactions });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

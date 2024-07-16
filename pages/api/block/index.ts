import "server-only";
import { convertBigIntsToNumbers } from "@/utils";
import { getBlocks } from "@/utils/blocks";
import { getBlock, getBlockStats } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { block_hash } = req.query;
    try {
      if (block_hash) {
        let block = await getBlock(block_hash as string);

        return res.status(200).json({
          block: convertBigIntsToNumbers(block)[0],
        });
      }
      const blocks = await getBlockStats();
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

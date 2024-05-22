import { getHome } from "@/utils/accounts";
import { getProducer, getStakinPOKT } from "@/utils/prisma";
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
      const {
        dataBlock,
        dataChartVetical,
        dataTrasaction,
        lastBlock,
        market,
        price,
        resultDought,
      } = await getHome();
      const produce = await getProducer();
      const staking = await getStakinPOKT();

      res.status(200).json({
        dataBlock,
        dataChartVetical,
        dataTrasaction,
        lastBlock,
        market,
        price,
        resultDought,
        produce,
        staking,
      });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

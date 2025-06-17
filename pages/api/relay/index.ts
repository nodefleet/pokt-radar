import "server-only";
import { getRelaysByChains } from "@/utils/relay";
import type { NextApiRequest, NextApiResponse } from "next";
import corsMiddleware from "../_middleware";

type ResponseData = {
  dataRelay?: {
    chain: string;
    total_relays: number;
    logoURL: string;
    gateway: number;
  }[];
  dataChart?: { date: string; count: number }[];
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const { dataRelay, dataChart } = await getRelaysByChains();

      res.status(200).json({
        dataChart,
        dataRelay,
      });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default corsMiddleware(handler);

import "server-only";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGobernance } from "@/utils/governance";
import corsMiddleware from "../_middleware";

type ResponseData = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { limit } = req.query;
    try {
      const { params, dataTransaction, dataExpense, dataIncome, daoBalance } =
        await getGobernance(limit ? Number(limit) : 10);

      return res
        .status(200)
        .json({ params, dataTransaction, dataExpense, dataIncome, daoBalance });
    } catch (error) {
      console.error("Error fetching home data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default corsMiddleware(handler);

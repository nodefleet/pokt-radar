import "server-only";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTransactionsByAddress } from "@/utils/txns";
import { convertBigIntsToNumbers } from "@/utils";
import corsMiddleware from "../_middleware";

type ResponseData = {
  message: string;
  transactions?: any[];
  address?: string;
  limit?: number;
  totalCount?: number;
  error?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { address, limit } = req.query;

    // Validar que se proporcione la dirección
    if (!address || typeof address !== "string") {
      return res.status(400).json({
        message: "Bad Request",
        error: "Address parameter is required",
      });
    }

    // Validar y establecer límite por defecto
    let transactionLimit = 10; // límite por defecto
    if (limit) {
      const parsedLimit = parseInt(limit as string);
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        return res.status(400).json({
          message: "Bad Request",
          error: "Limit must be a positive number",
        });
      }
      transactionLimit = Math.min(parsedLimit, 100); // máximo 100 transacciones
    }

    try {
      // Obtener transacciones de la dirección
      const { transactions } = await getTransactionsByAddress(
        address,
        transactionLimit
      );

      // Serializar las transacciones para manejar BigInt
      const serializedTransactions = transactions.map((transaction: any) => {
        return convertBigIntsToNumbers(transaction);
      });

      return res.status(200).json({
        message: "Success",
        address: address,
        limit: transactionLimit,
        totalCount: serializedTransactions.length,
        transactions: serializedTransactions,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: "Failed to fetch transactions",
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default corsMiddleware(handler);

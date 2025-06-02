import "server-only";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAccountPocker } from "@/utils/accounts";

type ResponseData = {
  message: string;
  balance?: number;
  address?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { address } = req.query;

    // Validar que se proporcione la dirección
    if (!address || typeof address !== "string") {
      return res.status(400).json({
        message: "Bad Request",
        error: "Address parameter is required",
      });
    }

    try {
      // Obtener datos de la cuenta
      const account = await getAccountPocker(address);

      if (!account) {
        return res.status(404).json({
          message: "Not Found",
          error: "Account not found",
        });
      }

      return res.status(200).json({
        message: "Success",
        address: address,
        balance: account.amount,
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: "Failed to fetch balance",
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

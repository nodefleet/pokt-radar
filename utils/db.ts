import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const apiUrl = "https://api.poktscan.com/poktscan/api/graphql";
export const authToken = "461fc459-6254-443c-939a-a84da4f495fb";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "info"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const fetchData = cache(async (query: string) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
});

import type { NextApiRequest, NextApiResponse } from "next";

// Middleware para configurar CORS
export default function corsMiddleware(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Configurar los headers de CORS para todas las respuestas
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir cualquier origen
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    // Manejar solicitudes OPTIONS (preflight)
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Continuar con el handler normal
    return handler(req, res);
  };
}

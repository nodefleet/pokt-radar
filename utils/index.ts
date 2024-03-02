import { Sql } from "@prisma/client/runtime";
// import { prisma } from "./db";

export function shortHash(hash: string) {
  return `
    ${hash.slice(0, 6)}...${hash.slice(-6)}`;
}

// export async function ejecutarConsultasPorMes() {
//   const mesesAtras = 2;
//   const fechaActual = new Date();
//   const primerDiaDelMesActual = new Date(
//     fechaActual.getFullYear(),
//     fechaActual.getMonth(),
//     1
//   );

//   for (let i = 0; i < mesesAtras; i++) {
//     const fechaInicioMes = new Date(
//       primerDiaDelMesActual.getFullYear(),
//       primerDiaDelMesActual.getMonth() - i,
//       1
//     );
//     const fechaFinMes = new Date(
//       fechaInicioMes.getFullYear(),
//       fechaInicioMes.getMonth() + 1,
//       0
//     );

//     await ejecutarConsultaParaMes(fechaInicioMes, fechaFinMes);
//   }
// }

// export async function ejecutarConsultaParaMes(
//   fechaInicio: Date,
//   fechaFin: Date
// ) {
//   try {
//     const query = `
//       CREATE MATERIALIZED VIEW transactions_within_time_range AS
//       SELECT t.*
//       FROM transactions t
//       WHERE EXISTS (
//         SELECT *
//         FROM blocks b
//         WHERE b.height = t.height
//         AND b.time >= '${fechaInicio.toISOString()}'::timestamp
//         AND b.time < '${fechaFin.toISOString()}'::timestamp
//       )
//     `;

//     try {
//       await prisma.$executeRaw(query as unknown as Sql);
//       console.log("Vista materializada creada exitosamente.");
//     } catch (error) {
//       console.error("Error al ejecutar la consulta:", error);
//     }

//     const transaccionesMes = await prisma.$queryRaw<any[]>`
//       SELECT * FROM transactions_within_time_range;
//     `;

//     return transaccionesMes;
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     throw error;
//   }
// }

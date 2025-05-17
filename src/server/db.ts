import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

const createPrismaClient = () => {
  const prisma = new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends({
    name: "reconnection-extension",
    query: {
      async $allOperations({ operation, model, args, query }) {
        try {
          return await query(args);
        } 
        catch (error: any) {
          if (error.code === 'P1001' || error.message?.includes('Cannot reach database server')) {
            console.log('[Prisma] Reconnecting...');
            await prisma.$disconnect();
            await prisma.$connect();
            return query(args);
          }
          throw error;
        }
      }
    }
  });

  return prisma;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
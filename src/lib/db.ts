import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: [], // Suppress noisy unhandled connection failure traces during offline/build mode
    });
  } catch (error) {
    return {} as PrismaClient;
  }
}

export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

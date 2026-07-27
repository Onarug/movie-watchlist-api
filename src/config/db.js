import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";

let prisma;

const connectDB = async () => {
    try {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        prisma = new PrismaClient({
            adapter,
            log: process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
        });
        await prisma.$connect();
        console.log("DB connected via Prisma");
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
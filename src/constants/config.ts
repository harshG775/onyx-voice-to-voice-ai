import dotenv from "dotenv";
import { z } from "zod";
import logger from "../utils/winston.logger";

dotenv.config();

const envSchema = z.object({
    // Server configuration
    PORT: z.string().default("3000"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    CORS_ORIGINS: z.string().transform((val) => val.split(",").map((origin) => origin.trim())),

    // Database configuration
    DB_HOST: z.string(),
    DB_PORT: z.string().default("5432"),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),

    // JWT configuration
    JWT_SECRET: z.string(),
    JWT_EXPIRATION: z.string(),

    // API keys
    GROQ_API_KEY: z.string().optional(),

    // Logging
    LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),

    // Redis cache
    REDIS_URL: z.string().optional(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    logger.error("❌ Invalid environment variables:", JSON.stringify(env.error.format(), null, 4));
    process.exit(1);
}

export const config = {
    server: {
        port: parseInt(env.data.PORT),
        nodeEnv: env.data.NODE_ENV,
        corsOrigins: env.data.CORS_ORIGINS,
    },
    db: {
        host: env.data.DB_HOST,
        port: parseInt(env.data.DB_PORT),
        database: env.data.DB_NAME,
        user: env.data.DB_USER,
        password: env.data.DB_PASSWORD,
    },
    jwt: {
        secret: env.data.JWT_SECRET,
        expiration: env.data.JWT_EXPIRATION,
    },
    api: {
        groqApiKey: env.data.GROQ_API_KEY,
    },
    logging: {
        level: env.data.LOG_LEVEL,
    },
    redis: {
        url: env.data.REDIS_URL,
    },
} as const;

export type Config = typeof config;

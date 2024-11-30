"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    // Server configuration
    PORT: zod_1.z.string().default("3000"),
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]).default("development"),
    CORS_ORIGINS: zod_1.z.string().transform((val) => val.split(",").map((origin) => origin.trim())),
    // Database configuration
    DB_HOST: zod_1.z.string(),
    DB_PORT: zod_1.z.string().default("5432"),
    DB_NAME: zod_1.z.string(),
    DB_USER: zod_1.z.string(),
    DB_PASSWORD: zod_1.z.string(),
    // JWT configuration
    JWT_SECRET: zod_1.z.string(),
    JWT_EXPIRATION: zod_1.z.string(),
    // API keys
    GROQ_API_KEY: zod_1.z.string().optional(),
    // Logging
    LOG_LEVEL: zod_1.z.enum(["error", "warn", "info", "debug"]).default("info"),
    // Redis cache
    REDIS_URL: zod_1.z.string().optional(),
});
const env = envSchema.safeParse(process.env);
if (!env.success) {
    winston_logger_1.default.error("❌ Invalid environment variables:", JSON.stringify(env.error.format(), null, 4));
    process.exit(1);
}
exports.config = {
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
};

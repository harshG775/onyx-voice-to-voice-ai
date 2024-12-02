import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./constants/config";
import { notFound } from "./middleware/error/errorHandling";
import cookieParser from "cookie-parser";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

// routes import
import healthRouter from "./routes/health.routes";
import aiRouter from "./routes/ai.routes";
import usersRouter from "./routes/users.routes";
import historiesRouter from "./routes/histories.routes";
import { authMiddleware } from "./middleware/auth/authMiddleware";

const app = express();

// Middleware
app.use(cors({ origin: config.server.corsOrigins, credentials: false }));
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(loggerMiddleware);

app.use("/health", healthRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/histories", authMiddleware, historiesRouter);
app.use("/api/v1/ai/", authMiddleware, aiRouter);

app.use("*", notFound);

export default app;

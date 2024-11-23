import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./constants/config";
import {errorHandler, notFound } from "./middleware/error/errorHandling";
import cookieParser from "cookie-parser";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

// routes import
import welcomeRoute from "./routes/welcome.routes";
import aiRouter from "./routes/ai.routes";

const app = express();

// Middleware
app.use(cors({ origin: config.server.corsOrigins, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(loggerMiddleware);


app.use("/api/", welcomeRoute);
app.use("/api/v1/ai/", aiRouter);
app.use("*", notFound);
// Error handling
app.use(errorHandler);


export default app;

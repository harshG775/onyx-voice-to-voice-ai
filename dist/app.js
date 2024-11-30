"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./constants/config");
const errorHandling_1 = require("./middleware/error/errorHandling");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const loggerMiddleware_1 = require("./middleware/loggerMiddleware");
// routes import
const welcome_routes_1 = __importDefault(require("./routes/welcome.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: config_1.config.server.corsOrigins, credentials: true }));
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(loggerMiddleware_1.loggerMiddleware);
app.use("/api/", welcome_routes_1.default);
app.use("/api/v1/ai/", ai_routes_1.default);
app.use("*", errorHandling_1.notFound);
// Error handling
app.use(errorHandling_1.errorHandler);
exports.default = app;

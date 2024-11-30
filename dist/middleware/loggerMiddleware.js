"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        winston_logger_1.default.info(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
    next();
};
exports.loggerMiddleware = loggerMiddleware;

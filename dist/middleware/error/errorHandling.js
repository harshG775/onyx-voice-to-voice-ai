"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
class AppError extends Error {
    statusCode;
    data;
    success;
    errors;
    constructor(message = "Internal Server Error", statusCode, errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode || 500;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const success = err.success || false;
    const message = err.message || "Something went wrong";
    const errors = err.errors || [];
    res.status(statusCode).json({
        success,
        message,
        errors,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Only show stack trace in development
    });
};
exports.errorHandler = errorHandler;
exports.notFound = (0, asyncHandler_1.asyncHandler)(async (req) => {
    throw new AppError(`Not Found - ${req.originalUrl}`, 404);
});

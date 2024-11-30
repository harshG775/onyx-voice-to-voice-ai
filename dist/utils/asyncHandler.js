"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncPromiseHandler = exports.asyncHandler = void 0;
const winston_logger_1 = __importDefault(require("./winston.logger"));
// asyncHandler: Use this if you want to directly handle errors and send a custom response without relying on centralized error handling.
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            winston_logger_1.default.error(error);
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    };
};
exports.asyncHandler = asyncHandler;
/**
 * asyncPromiseHandler: Use this if you prefer a centralized error handling approach and have middleware designed to handle errors globally.
 *
 */
const asyncPromiseHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncPromiseHandler = asyncPromiseHandler;

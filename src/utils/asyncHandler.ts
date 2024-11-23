import { Request, Response, NextFunction } from "express";
import logger from "./winston.logger";
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// asyncHandler: Use this if you want to directly handle errors and send a custom response without relying on centralized error handling.
export const asyncHandler = (fn: AsyncFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            logger.error(error);
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    };
};

/**
 * asyncPromiseHandler: Use this if you prefer a centralized error handling approach and have middleware designed to handle errors globally.
 *
 */

export const asyncPromiseHandler = (fn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

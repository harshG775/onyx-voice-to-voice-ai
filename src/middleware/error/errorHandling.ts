import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

type ErrorDetails = {
    message: string;
    field?: string;
};

class AppError extends Error {
    public statusCode: number;
    public data: any;
    public success: boolean;
    public errors: ErrorDetails[];

    constructor(message = "Internal Server Error", statusCode: number, errors: ErrorDetails[] = [], stack = "") {
        super(message);
        this.statusCode = statusCode || 500;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
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

export const notFound = asyncHandler(async (req: Request) => {
    throw new AppError(`Not Found - ${req.originalUrl}`, 404);
});

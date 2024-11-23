import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import responseStatus from "../utils/responseStatus";

export const welcome = asyncHandler(async (req: Request, res: Response) => {
    responseStatus.ok(res, {
        message: "welcome to version 1.0.0 of the api",
        version: "1.0.0",
    });
});

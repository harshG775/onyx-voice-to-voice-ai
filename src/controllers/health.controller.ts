import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import responseStatus from "../utils/responseStatus";

export const health = asyncHandler(async (req: Request, res: Response) => {
    responseStatus.ok(res, {
        message: "ok",
    });
});

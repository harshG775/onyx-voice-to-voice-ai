import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import responseStatus from "../utils/responseStatus";
import { createAccessToken } from "../utils/jwt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return responseStatus.badRequest(res, "email and password are required");
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
            password,
        },
    });
    if (!user) {
        return responseStatus.notFound(res, "user not found");
    }
    const token = createAccessToken(user);
    responseStatus.created(res, {
        token,
    });
});

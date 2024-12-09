import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import responseStatus from "../utils/responseStatus";
import { createAccessToken } from "../utils/jwt";

import { PrismaClient, User } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/encryption";
const prisma = new PrismaClient();

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return responseStatus.badRequest(res, "email and password are required");
    }
    //
    const hashedPassword = await hashPassword(password);

    const isCorrectPassword = await comparePassword(password, hashedPassword);
    if (!isCorrectPassword) {
        return responseStatus.unauthorized(res, "incorrect password");
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
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

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return responseStatus.badRequest(res, "email and password are required");
    }

    const hashedPassword = await hashPassword(password);
    let newUser = null;
    try {
        newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    } catch (error) {
        console.log(error);
        newUser = null;
    }
    if (!newUser) {
        return responseStatus.notFound(res, "user already exists");
    }
    const token = createAccessToken(newUser);
    responseStatus.created(res, {
        token,
    });
});



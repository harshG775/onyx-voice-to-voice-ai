import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import responseStatus from "../utils/responseStatus";
import { verifyToken } from "../utils/jwt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createHistory = asyncHandler(async (req: Request, res: Response) => {
    // bearer token from request
    const session_id = req.headers.authorization?.split(" ")[1];
    if (!session_id) {
        responseStatus.unauthorized(res, "unauthorized session_id not found");
        return;
    }
    const session_user = verifyToken(session_id);
    if (!session_user) {
        responseStatus.unauthorized(res, "unauthorized user not found");
        return;
    }
    //

    // create new history and add to User
    const history = await prisma.history.create({
        data: {
            userId: session_user.id as string,
            title: `New History-${Date.now()}`,
            messages: {
                create: [],
            },
        },
    });

    responseStatus.created(res, { history });
});
export const getHistories = asyncHandler(async (req: Request, res: Response) => {
    // bearer token from request
    const session_id = req.headers.authorization?.split(" ")[1];
    if (!session_id) {
        responseStatus.unauthorized(res, "unauthorized session_id not found");
        return;
    }
    const session_user = verifyToken(session_id);
    if (!session_user) {
        responseStatus.unauthorized(res, "unauthorized user not found");
        return;
    }
    //

    const histories = await prisma.history.findMany({
        where: {
            userId: session_user.id,
        },
    });

    responseStatus.ok(res, { histories });
});

export const getHistory = asyncHandler(async (req: Request, res: Response) => {
    // bearer token from request
    const session_id = req.headers.authorization?.split(" ")[1];
    if (!session_id) {
        responseStatus.unauthorized(res, "unauthorized session_id not found");
        return;
    }
    const session_user = verifyToken(session_id);
    if (!session_user) {
        responseStatus.unauthorized(res, "unauthorized user not found");
        return;
    }
    //

    const history = await prisma.history.findUnique({
        where: {
            id: req.params.history_id,
            userId: session_user.id,
        },
        include: {
            messages: true,
        },
    });

    if (!history) {
        responseStatus.notFound(res, "history not found");
        return;
    }
    responseStatus.ok(res, { history });
});
export const deleteHistory = asyncHandler(async (req: Request, res: Response) => {
    // bearer token from request
    const session_id = req.headers.authorization?.split(" ")[1];
    if (!session_id) {
        responseStatus.unauthorized(res, "unauthorized session_id not found");
        return;
    }
    const session_user = verifyToken(session_id);
    if (!session_user) {
        responseStatus.unauthorized(res, "unauthorized user not found");
        return;
    }
    //

    const deletedHistory = await prisma.history.delete({
        where: {
            id: req.params.history_id,
            userId: session_user.id,
        },
    });
    console.log(deletedHistory);

    if (!deletedHistory) {
        responseStatus.notFound(res, "history not found");
        return;
    }

    responseStatus.deleted(res, { message: "history deleted" });
});

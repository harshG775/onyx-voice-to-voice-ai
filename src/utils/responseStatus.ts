import HttpStatusCodes from "../common/HttpStatusCodes";
import { Response } from "express";
import { Readable } from "stream";

interface ResponseData {
    [key: string]: any;
}

const responseStatus = {
    ok: (res: Response, data: ResponseData = {}) => res.status(HttpStatusCodes.OK).json({ success: true, ...data }),

    created: (res: Response, data: ResponseData = {}) => res.status(HttpStatusCodes.CREATED).json({ success: true, ...data }),

    badRequest: (res: Response, message: string = "Bad Request") => res.status(HttpStatusCodes.BAD_REQUEST).json({ success: false, message }),

    unauthorized: (res: Response, message: string = "Unauthorized") => res.status(HttpStatusCodes.UNAUTHORIZED).json({ success: false, message }),

    forbidden: (res: Response, message: string = "Forbidden") => res.status(HttpStatusCodes.FORBIDDEN).json({ success: false, message }),

    notFound: (res: Response, message: string = "Not Found") => res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, message }),

    serverError: (res: Response, message: string = "Internal Server Error") => res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message }),

    message: (res: Response, statusCode: number, message: string) => res.status(statusCode).json({ message }),

    deleted: (res: Response, data: ResponseData = {}) => res.status(HttpStatusCodes.NO_CONTENT).json({ success: true, ...data }),
    
};

export default responseStatus;

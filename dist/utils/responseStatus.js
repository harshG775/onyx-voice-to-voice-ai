"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = __importDefault(require("../common/HttpStatusCodes"));
const responseStatus = {
    ok: (res, data = {}) => res.status(HttpStatusCodes_1.default.OK).json({ success: true, ...data }),
    created: (res, data = {}) => res.status(HttpStatusCodes_1.default.CREATED).json({ success: true, ...data }),
    badRequest: (res, message = "Bad Request") => res.status(HttpStatusCodes_1.default.BAD_REQUEST).json({ success: false, message }),
    unauthorized: (res, message = "Unauthorized") => res.status(HttpStatusCodes_1.default.UNAUTHORIZED).json({ success: false, message }),
    forbidden: (res, message = "Forbidden") => res.status(HttpStatusCodes_1.default.FORBIDDEN).json({ success: false, message }),
    notFound: (res, message = "Not Found") => res.status(HttpStatusCodes_1.default.NOT_FOUND).json({ success: false, message }),
    serverError: (res, message = "Internal Server Error") => res.status(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message }),
    message: (res, statusCode, message) => res.status(statusCode).json({ message }),
    streamPipe: (res, stream, statusCode = HttpStatusCodes_1.default.OK, contentType = "application/octet-stream") => {
        res.status(statusCode);
        res.setHeader("Content-Type", contentType);
        stream.pipe(res);
    },
};
exports.default = responseStatus;

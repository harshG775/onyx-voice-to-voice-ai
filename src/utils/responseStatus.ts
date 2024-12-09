import HttpStatusCodes from "../common/HttpStatusCodes";
import { Response } from "express";

/**
 * Common interface for response data.
 */
interface ResponseData {
    [key: string]: any;
}

/**
 * Utility functions for sending HTTP responses.
 */
const responseStatus = {
    /**
     * Sends a successful response with status 200.
     * @param res - Express Response object.
     * @param data - Data to include in the response.
     */
    ok: (res: Response, data: ResponseData = {}) => {
        console.log(`[OK]: Response sent successfully.`);
        return res.status(HttpStatusCodes.OK).json({ success: true, data });
    },

    /**
     * Sends a successful response with custom headers and status 200.
     * @param res - Express Response object.
     * @param headers - Headers to include in the response.
     * @param data - Data to include in the response.
     */
    okWithHeaders: (res: Response, headers: Record<string, string>, data: ResponseData = {}) => {
        Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
        console.log(`[OK With Headers]: Response sent successfully with custom headers.`);
        return res.status(HttpStatusCodes.OK).json({ success: true, data });
    },

    /**
     * Sends a response indicating a resource was successfully created with status 201.
     * @param res - Express Response object.
     * @param data - Data to include in the response.
     */
    created: (res: Response, data: ResponseData = {}) => {
        console.log(`[Created]: Resource created successfully.`);
        return res.status(HttpStatusCodes.CREATED).json({ success: true, data });
    },

    /**
     * Sends a response indicating a request was accepted but not yet processed with status 202.
     * @param res - Express Response object.
     * @param data - Data to include in the response.
     */
    accepted: (res: Response, data: ResponseData = {}) => {
        console.log(`[Accepted]: Request accepted for processing.`);
        return res.status(HttpStatusCodes.ACCEPTED).json({ success: true, data });
    },

    /**
     * Sends a response indicating no modifications to the resource with status 304.
     * @param res - Express Response object.
     */
    notModified: (res: Response) => {
        console.log(`[Not Modified]: Resource not modified.`);
        return res.sendStatus(HttpStatusCodes.NOT_MODIFIED);
    },

    /**
     * Sends a response indicating a bad request with status 400.
     * @param res - Express Response object.
     * @param message - Error message to include in the response.
     */
    badRequest: (res: Response, message: string = "Bad Request") => {
        console.error(`[BadRequest]: ${message}`);
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ success: false, message });
    },

    /**
     * Sends a response indicating unauthorized access with status 401.
     * @param res - Express Response object.
     * @param message - Error message to include in the response.
     */
    unauthorized: (res: Response, message: string = "Unauthorized") => {
        console.warn(`[Unauthorized]: ${message}`);
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({ success: false, message });
    },

    /**
     * Sends a response indicating forbidden access with status 403.
     * @param res - Express Response object.
     * @param message - Error message to include in the response.
     */
    forbidden: (res: Response, message: string = "Forbidden") => {
        console.warn(`[Forbidden]: ${message}`);
        return res.status(HttpStatusCodes.FORBIDDEN).json({ success: false, message });
    },

    /**
     * Sends a response indicating a resource was not found with status 404.
     * @param res - Express Response object.
     * @param message - Error message to include in the response.
     */
    notFound: (res: Response, message: string = "Not Found") => {
        console.info(`[NotFound]: ${message}`);
        return res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, message });
    },

    /**
     * Sends a response indicating an internal server error with status 500.
     * @param res - Express Response object.
     * @param message - Error message to include in the response.
     */
    serverError: (res: Response, message: string = "Internal Server Error") => {
        console.error(`[ServerError]: ${message}`);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message });
    },

    /**
     * Sends a response with a custom status code and message.
     * @param res - Express Response object.
     * @param statusCode - HTTP status code to use.
     * @param message - Message to include in the response.
     */
    message: (res: Response, statusCode: number, message: string) => {
        console.log(`[Custom Message]: ${message}`);
        return res.status(statusCode).json({ success: statusCode < 400, message });
    },

    /**
     * Sends a response indicating a resource was successfully deleted with status 204.
     * No response body is included, as per HTTP standards.
     * @param res - Express Response object.
     */
    deleted: (res: Response) => {
        console.log(`[Deleted]: Resource deleted successfully.`);
        return res.sendStatus(HttpStatusCodes.NO_CONTENT);
    },

    /**
     * Sends a response indicating a conflict with status 409.
     * @param res - Express Response object.
     * @param message - Error message to include in the response.
     */
    conflict: (res: Response, message: string = "Conflict") => {
        console.warn(`[Conflict]: ${message}`);
        return res.status(HttpStatusCodes.CONFLICT).json({ success: false, message });
    },

    /**
     * Sends a response indicating an unprocessable entity with status 422.
     * @param res - Express Response object.
     * @param message - Error message to include in the response.
     */
    unprocessableEntity: (res: Response, message: string = "Unprocessable Entity") => {
        console.warn(`[UnprocessableEntity]: ${message}`);
        return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, message });
    },

    /**
     * Sends a response indicating too many requests with status 429.
     * Optionally sets a Retry-After header.
     * @param res - Express Response object.
     * @param retryAfter - Retry-After value in seconds.
     * @param message - Error message to include in the response.
     */
    tooManyRequests: (res: Response, retryAfter: number, message: string = "Too Many Requests") => {
        res.setHeader("Retry-After", retryAfter.toString());
        console.warn(`[TooManyRequests]: ${message}`);
        return res.status(HttpStatusCodes.TOO_MANY_REQUESTS).json({ success: false, message });
    },
};

export default responseStatus;

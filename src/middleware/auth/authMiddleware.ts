import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt";
import { asyncHandler } from "../../utils/asyncHandler";
import responseStatus from "../../utils/responseStatus";

/**
 * Middleware to validate JWT in the Authorization header.
 * Attaches the decoded token payload to req.user if valid.
 */
export const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader) {
        return responseStatus.unauthorized(res, "Unauthorized: No token provided");
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return responseStatus.unauthorized(res, "Unauthorized: Malformed Authorization header");
    }

    const token = tokenParts[1]; // Extract the token

    // Verify the token
    try {
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return responseStatus.unauthorized(res, "Unauthorized: Invalid or expired token");
        }

        // Attach the decoded token to the request object
        // req.user = decodedToken;
        next(); // Proceed to the next middleware or route handler
    } catch (error: unknown) {
        if (error instanceof Error) {
            return responseStatus.unauthorized(res, `Unauthorized: Invalid token ${error.message}`);
        }
        return responseStatus.unauthorized(res, "Unauthorized: Unknown error");
    }
});

import { JwtPayload } from "jsonwebtoken";

// Extend the Express Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export {}; // This file needs to be a module to augment the global namespace

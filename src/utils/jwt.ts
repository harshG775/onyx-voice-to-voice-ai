import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../constants/config";

const { secret, expiration } = config.jwt;
export enum TokenEnum {
    REFRESH = "REFRESH",
    ACCESS = "ACCESS",
}

/**
 * Creates an access token for the given user.
 * @param user The user object from the database.
 * @returns The signed access token.
 */
export function createAccessToken(user: User) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: TokenEnum.ACCESS,
    };
    return jwt.sign(payload, secret, { expiresIn: expiration });
}

/**
 * Verifies a given token.
 * @param token The token to verify.
 * @returns The decoded token if valid.
 */
export function verifyToken(token: string) {
    const decodedJWT = jwt.verify(token, secret);
    if (isJWTExpired(decodedJWT)) {
        return null;
    }
    return decodedJWT as JwtPayload;
}

/**
 * @param decodedJWT The verified token.
 * @returns is JWT Expired.
 */
export function isJWTExpired(decodedJWT: any) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since Unix epoch
    return decodedJWT.exp < currentTime;
}

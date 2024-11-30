"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const responseStatus_1 = __importDefault(require("../utils/responseStatus"));
exports.welcome = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    responseStatus_1.default.ok(res, {
        message: "welcome to version 1.0.0 of the api",
        version: "1.0.0",
    });
});

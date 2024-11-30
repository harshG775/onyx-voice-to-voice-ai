"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groqClient = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const config_1 = require("../../constants/config");
exports.groqClient = new groq_sdk_1.default({ apiKey: config_1.config.api.groqApiKey });

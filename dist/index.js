"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./constants/config");
const winston_logger_1 = __importDefault(require("./utils/winston.logger"));
const port = config_1.config.server.port || 4000;
(async () => {
    try {
        app_1.default.listen(port, () => {
            winston_logger_1.default.info(`Server running at http://localhost:${port}`);
        });
    }
    catch (error) {
        winston_logger_1.default.error("Failed to start server", { error });
        process.exit(1);
    }
})();

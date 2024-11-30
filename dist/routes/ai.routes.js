"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const aiRouter = (0, express_1.Router)();
aiRouter.route("/completion").post(ai_controller_1.completion);
exports.default = aiRouter;

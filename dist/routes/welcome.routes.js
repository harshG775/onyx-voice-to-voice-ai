"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welcome_controller_1 = require("../controllers/welcome.controller");
const welcomeRoute = (0, express_1.Router)();
welcomeRoute.route("/v1").get(welcome_controller_1.welcome);
exports.default = welcomeRoute;

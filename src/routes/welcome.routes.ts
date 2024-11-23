import { Router } from "express";
import { welcome } from "../controllers/welcome.controller";
const welcomeRoute = Router();

welcomeRoute.route("/v1").get(welcome);

export default welcomeRoute;

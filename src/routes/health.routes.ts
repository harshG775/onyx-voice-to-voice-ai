import { Router } from "express";
import { health } from "../controllers/health.controller";
const healthRouter = Router();

healthRouter.route("/").get(health);

export default healthRouter;

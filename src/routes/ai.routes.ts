import { Router } from "express";
import { completion } from "../controllers/ai.controller";
const aiRouter = Router();

aiRouter.route("/completion").post(completion);

export default aiRouter;

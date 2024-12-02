import { Router } from "express";
import { completion } from "../controllers/ai.controller";
const aiRouter = Router();

// how to add authMiddleware only for this route
// aiRouter.route("/completion").post(completion);
aiRouter.route("/completion").post(completion);

export default aiRouter;

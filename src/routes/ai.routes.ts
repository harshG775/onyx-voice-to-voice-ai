import { Router } from "express";
import { completion } from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth/authMiddleware";
const aiRouter = Router();

// how to add authMiddleware only for this route
// aiRouter.route("/completion").post(completion);
aiRouter.route("/completion").post(authMiddleware, completion);

export default aiRouter;

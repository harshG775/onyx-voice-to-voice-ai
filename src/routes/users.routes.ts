import { Router } from "express";
import { login } from "../controllers/users.controller";
const usersRouter = Router();

usersRouter.route("/auth/login").post(login);

export default usersRouter;

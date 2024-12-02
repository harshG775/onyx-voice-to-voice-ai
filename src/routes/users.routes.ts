import { Router } from "express";
import { login } from "../controllers/users.controller";
const usersRouter = Router();

// auth
usersRouter.route("/auth/login").post(login);

export default usersRouter;

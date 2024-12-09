import { Router } from "express";
import { login, register } from "../controllers/users.controller";
const usersRouter = Router();

// auth
usersRouter.route("/auth/login").post(login);
usersRouter.route("/auth/register").post(register);

export default usersRouter;

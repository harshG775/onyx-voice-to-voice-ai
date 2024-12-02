import { Router } from "express";
import { createHistory, getHistories, getHistory, deleteHistory } from "../controllers/histories.controller";
const historiesRouter = Router();

// crud
historiesRouter.route("/").post(createHistory);
historiesRouter.route("/").get(getHistories);
historiesRouter.route("/:history_id").get(getHistory);
historiesRouter.route("/:history_id").delete(deleteHistory);

export default historiesRouter;

import { Router } from "express";
import {
  postCreateHandler,
  postDeleteHandler,
  postIndexHandler,
  postUpdateHandler,
} from "./controller.js";

export const postRouter = Router();

postRouter.get("/", postIndexHandler);
postRouter.post("/", postCreateHandler);
postRouter.patch("/", postUpdateHandler);
postRouter.delete("/", postDeleteHandler);

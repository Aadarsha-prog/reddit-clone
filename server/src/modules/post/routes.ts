import { Router } from "express";
import {
  postCreateHandler,
  postDeleteHandler,
  postIndexHandler,
  postUpdateHandler,
} from "./controller.js";

export const postRouter = Router()
  .get("/", postIndexHandler)
  .post("/", postCreateHandler)
  .patch("/", postUpdateHandler)
  .delete("/", postDeleteHandler);

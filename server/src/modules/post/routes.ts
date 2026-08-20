import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  postCreateHandler,
  postDeleteHandler,
  postIndexHandler,
  postUpdateHandler,
} from "./controller.js";
import { postCreateSchema } from "./schemas/create.schema.js";
import { validate } from "../../middleware/validation.middleware.js";

export const postRouter = Router()
  .get("/", postIndexHandler)
  .post("/", validate(postCreateSchema), postCreateHandler)
  .patch("/", postUpdateHandler)
  .delete("/", postDeleteHandler);

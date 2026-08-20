import type { Request, Response } from "express";
import { posts } from "./service.js";
import {
  postCreateSchema,
  type PostCreateInput,
} from "./schemas/create.schema.js";

export function postIndexHandler(req: Request, res: Response) {
  return res.json(posts);
}

export function postCreateHandler(req: Request, res: Response) {
  const validatedBody = req.validatedBody as PostCreateInput;

  posts.push(validatedBody);
  console.log("POST CREATE HANDLER", validatedBody);

  return res.json(validatedBody);
}

export function postUpdateHandler(req: Request, res: Response) {
  return res.json({
    message: "Hello from the Post update route!",
  });
}

export function postDeleteHandler(req: Request, res: Response) {
  return res.json({
    message: "Hello from the Post delete route!",
  });
}

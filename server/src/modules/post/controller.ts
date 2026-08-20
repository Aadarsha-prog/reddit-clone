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
  // Generate a random id
  const randomId = (Math.floor(Math.random() * 1000) + 1).toString();
  const post = { id: randomId, ...validatedBody };
  posts.push(post);
  return res.json(post);
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

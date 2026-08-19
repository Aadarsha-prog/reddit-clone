import type { Request, Response } from "express";
import { posts } from "./service.js";

export function postIndexHandler(req: Request, res: Response) {
  return res.json(posts);
}

export function postCreateHandler(req: Request, res: Response) {
  const body = req.body;

  const post = body;

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

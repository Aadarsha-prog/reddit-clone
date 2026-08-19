import type { Request, Response } from "express";

export function postIndexHandler(req: Request, res: Response) {
  res.send("Hello from the Post index route!");
}

export function postCreateHandler(req: Request, res: Response) {
  res.send("Hello from the Post create route!");
}

export function postUpdateHandler(req: Request, res: Response) {
  res.send("Hello from the Post update route!");
}

export function postDeleteHandler(req: Request, res: Response) {
  res.send("Hello from the Post delete route!");
}

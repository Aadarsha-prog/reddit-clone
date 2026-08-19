import { Router } from "express";
import { PostController } from "./controller.js";

export const createPostRouter = () => {
  const router = Router();
  const postController = new PostController();

  router.get("/", (req, res) => postController.getPosts(req, res));
  router.post("/", (req, res) => postController.createPost(req, res));
  router.get("/:id", (req, res) => postController.getPost(req, res));
  router.put("/:id", (req, res) => postController.updatePost(req, res));
  router.delete("/:id", (req, res) => postController.deletePost(req, res));

  return router;
};
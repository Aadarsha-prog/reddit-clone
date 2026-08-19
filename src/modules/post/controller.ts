import { Request, Response } from "express";

export class PostController {
  private posts: Array<{
    id: number;
    title: string;
    content: string;
  }> = [];

  getPosts(req: Request, res: Response) {
    res.json(this.posts);
  }

  createPost(req: Request, res: Response) {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ 
        error: "Title and content are required" 
      });
    }

    const newPost = {
      id: this.posts.length + 1,
      title,
      content,
    };

    this.posts.push(newPost);
    res.status(201).json(newPost);
  }

  getPost(req: Request, res: Response) {
    const { id } = req.params;
    const post = this.posts.find((p) => p.id === Number(id));

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  }

  updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = this.posts.find((p) => p.id === Number(id));

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    res.json(post);
  }

  deletePost(req: Request, res: Response) {
    const { id } = req.params;
    const postIndex = this.posts.findIndex((p) => p.id === Number(id));

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    const [deletedPost] = this.posts.splice(postIndex, 1);
    res.json(deletedPost);
  }
}
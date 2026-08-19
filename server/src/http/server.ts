import express, { type Router, type Express } from "express";
import { postRouter } from "../modules/post/routes.js";

export class CustomServer {
  public app: Express;

  constructor() {
    this.app = express();
    return this;
  }

  startServer() {
    this.app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
    return this;
  }

  regsiterRequiredMiddlewares() {
    this.app.use(express.json());
    return this;
  }

  registerHealthCheckRoute() {
    this.app.get("/", (req, res) => {
      res.redirect("/health");
    });

    this.app.get("/health", (req, res) => {
      res.send("OK");
    });
    return this;
  }

  registerModuleRouter(version: string, prefix: string, router: Router) {
    this.app.use(`/api/${version}/${prefix}`, router);
    return this;
  }
}

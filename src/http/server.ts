import express, { Router } from "express";

export class CustomServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setUpMiddlewares();
  }

  private setUpMiddlewares() {
    this.app.use(express.json());
  }

  startServer(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
    return this;
  }

  registerHealthCheckRoute() {
    this.app.get("/health", (req, res) => {
      res.status(200).json({ status: "OK" });
    });
    return this;
  }

  registerModuleRouter(version: string, feature: string, router: Router) {
    this.app.use(`/api/${version}/${feature}`, router);
    return this;
  }
}
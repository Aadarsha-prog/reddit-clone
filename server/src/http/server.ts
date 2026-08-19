import express, { type Router, type Express } from "express";

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

  //   createGlobalPrefix(prefix: string) {
  //     this.app.use(`/${prefix}`, (req, res, next) => {
  //       console.log(
  //         `Global prefix ${prefix} applied to request: ${req.method} ${req.url}`,
  //       );
  //       next();
  //     });
  //     return this;
  //   }

  registerRouter(prefix: string, router: Router) {
    this.app.use(`/${prefix}`, router);
    return this;
  }
}

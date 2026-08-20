import express, {
  type Router,
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { postRouter } from "../modules/post/routes.js";
import { ErrorHandler } from "./error/handler.js";

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

  registerRequestErrorHandler() {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        const handledError = new ErrorHandler(err);
        const responsePayload = handledError.handle();
        return res.status(responsePayload.status).json(responsePayload);
      },
    );
    return this;
  }
}

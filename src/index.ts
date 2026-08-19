import { CustomServer } from "./http/server.js";
import {createPostRouter} from "./modules/post/routes.js";


const server = new CustomServer();
const postRouter = createPostRouter();



server.startServer(3000)
      .registerHealthCheckRoute()
      .registerModuleRouter("v1", "posts", postRouter);
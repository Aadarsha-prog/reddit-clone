import { v1Router } from "./http/routes/v1/router.js";
import { CustomServer } from "./http/server.js";

const server = new CustomServer();

server.startServer().registerRouter("api/v1", v1Router);

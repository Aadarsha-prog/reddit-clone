import { Router } from "express";
const v1Router = Router();

v1Router.get("/", (req, res) => {
  res.send("v1");
});

export { v1Router };

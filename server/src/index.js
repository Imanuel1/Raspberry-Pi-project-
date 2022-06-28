import express from "express";
import cors from "cors";
import { PORT } from "./environment";
import router from "./router";
import { gpioInit } from "./middlewares/rpiHandler";

const app = express();

app
  .use(cors())
  .use(express.json({ limit: "5mb" }))
  .use(express.urlencoded({ extended: false }))
//   .use(logRequest)
  .use(express.static("build"))
  .use("/api", router)
//   .use(errorHandler)
  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    gpioInit();
  });

import express from "express";
import cors from "cors";
import { PORT } from "./environment";
import router from "./router";
import { gpioInit } from "./middlewares/rpiHandler";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const httpServer = createServer(app)
export const io = new Server(httpServer);

app
  .use(cors())
  .use(express.json({ limit: "5mb" }))
  .use(express.urlencoded({ extended: false }))
//   .use(logRequest)
  .use(express.static("build"))
  .use("/api", router)
//   .use(errorHandler)
  
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    gpioInit();
  });

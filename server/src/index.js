import express from "express";
import cors from "cors";
import { PORT } from "./environment";

const app = express();

app
  .use(cors())
  .use(express.json({ limit: "5mb" }))
  .use(express.urlencoded({ extended: false }))
  .use(express.static("build"))
  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

import express from "express";
import { cameraRouter, ledsRouter } from "./routers";

const router = express.Router();

router.use(ledsRouter).use(cameraRouter);

export default router;

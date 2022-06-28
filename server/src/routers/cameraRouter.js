import express from "express";
import { getAllCameraImg } from "../controllers/cameraController";

export const cameraRouter = express.Router();

cameraRouter.route("/camera").get(getAllCameraImg);

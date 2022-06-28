import express from "express";
import { getAllLedsStatus, putLedsBlinks, putLedStatus } from "../controllers/ledsController";

export const ledsRouter = express.Router();

ledsRouter.route("/leds").get(getAllLedsStatus);
ledsRouter.route("/leds/blinks").put(putLedsBlinks);
ledsRouter.route("/led").put(putLedStatus);

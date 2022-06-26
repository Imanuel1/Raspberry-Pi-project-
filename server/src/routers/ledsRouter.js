import express from 'express';
import { getAllLedsStatus } from '../controllers/ledsController';

export const ledsRouter = express.Router();

ledsRouter.route('/leds').get(getAllLedsStatus);
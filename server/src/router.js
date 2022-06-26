import express from 'express'

const router = express.Router();

router
  .use(ledsRouter);

export default router;
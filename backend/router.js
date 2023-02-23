/** @format */

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Finally");
});

export default router;

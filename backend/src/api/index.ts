import express, { Request, Response } from "express";

import auth from "./auth/auth.route";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.json({
    message: "well, wellcome to the backed api",
  });
});

router.use("/auth", auth);

export default router;

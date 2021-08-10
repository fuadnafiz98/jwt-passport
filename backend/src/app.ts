import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import express, { Request, Response, NextFunction, Errback } from "express";
import helmet from "helmet";
import { errors } from "celebrate";

import api from "./api";
import { handleAuth, errorHandler, notFound } from "./middlewares";
import passport from "./auth/passport";

const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (_, res) => {
  res.json({
    message: "welcome to the backed!!",
  });
});

app.get("/api/vip", handleAuth, (req, res) => {
  return res.json(req.user);
});

app.use("/api", api);

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(404).json({ message: err });
});

app.use(notFound);
app.use(errorHandler);
app.use(errors());

export default app;

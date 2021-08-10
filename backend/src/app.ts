<<<<<<< HEAD
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
=======
import express, { Request, Response, NextFunction, Errback } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errors } from "celebrate";
// import { errorHandler, notFound } from "./middlewares";
import api from "./api";
import passport from "./auth/passport";
import { handleAuth, handleRefreshToken } from "./middlewares";

const app = express();

app.use(cors());
app.use(cookieParser());
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
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

<<<<<<< HEAD
app.use(notFound);
app.use(errorHandler);
=======
// app.use(notFound);
// app.use(errorHandler);
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
app.use(errors());

export default app;

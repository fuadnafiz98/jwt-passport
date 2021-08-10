<<<<<<< HEAD
import { Request, Response, NextFunction } from "express";
import logger from "loglevel";
=======
import { Request, Response } from "express";
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f

interface Error {
  status?: number;
  name?: string;
  message?: string;
  stack?: any;
  errors?: any;
}

<<<<<<< HEAD
function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`Handling error from ErrorHandler`);

  if (res.headersSent) {
    next(error);
  } else {
    logger.error(error);
    const statusCode = req.statusCode;
    res.status(statusCode || 500);
    res.json({
      status: statusCode,
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
      errors: error.errors || undefined,
    });
  }
=======
function errorHandler(error: Error, req: Request, res: Response) {
  console.log("here");
  const statusCode = req.statusCode;
  res.status(statusCode || 500);
  res.json({
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    errors: error.errors || undefined,
  });
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
}

export default errorHandler;

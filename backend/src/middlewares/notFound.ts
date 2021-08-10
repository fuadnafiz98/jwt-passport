import { Request, Response, NextFunction } from "express";

function notFound(req: Request, res: Response, next: NextFunction) {
<<<<<<< HEAD
  console.log(`not found error`);
=======
  console.log("HHHH");
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export default notFound;

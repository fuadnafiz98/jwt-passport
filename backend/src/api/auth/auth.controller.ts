import { NextFunction, Request, Response } from "express";
import * as service from "./auth.service";

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.signUp(req.body);
    res.cookie("JWTToken", data.token, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.json({
      data: {
        token: data.token,
        userInfo: {
          name: data.username,
          userId: data.userId,
          role: data.role,
        },
      },
    });
<<<<<<< HEAD
  } catch (err: any) {
    return next(err);
=======
  } catch (err) {
    return next(err.message);
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
  }
}
async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.signIn(req.body);

    res.cookie("JWTToken", data.token, {
      httpOnly: true,
      secure: true,
    });

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.json({
      data: {
        token: data.token,
        userInfo: {
          email: data.email,
          name: data.name,
          userId: data._id,
          role: data.role,
        },
      },
    });
<<<<<<< HEAD
  } catch (err: any) {
=======
  } catch (err) {
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
    return next(err.message);
  }
}

async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    await service.signOut(req.body);
<<<<<<< HEAD
  } catch (err: any) {
=======
  } catch (err) {
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
    return next(err.message);
  }
  if (req.cookies.JWTToken) {
    res.clearCookie("JWTToken", {
      httpOnly: true,
    });
  }
  if (req.cookies.refreshToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });
  }
  return res.json({
    data: "user logged out successfully",
  });
}

async function checkToken(req: Request, res: Response, next: NextFunction) {
  const data = await service.checkToken(req.cookies);
  if (data === null) {
    console.log("returning");
    return res.status(401).json({ data: "unauth token" });
  }
  res.cookie("JWTToken", data.token, {
    httpOnly: true,
    secure: true,
  });
  return res.json({
    data: {
      token: data.token,
      userInfo: {
        name: data.name,
        userId: data._id,
        role: data.role,
      },
    },
  });
}

export { checkToken, signUp, signIn, signOut };

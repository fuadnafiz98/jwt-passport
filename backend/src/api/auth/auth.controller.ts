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
  } catch (err: any) {
    return next(err);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.signIn(req.body);

    res.cookie("JWTToken", data.token, {
      // domain: ".example.com",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });

    res.cookie("refreshToken", data.refreshToken, {
      // domain: ".example.com",
      sameSite: "strict",
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
  } catch (err: any) {
    return next(err.message);
  }
}

async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    await service.signOut(req.body);
  } catch (err: any) {
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

async function generateResetLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await service.generateResetLink(req.body);
    if (data === null) {
      return res.json({
        message: "Error!, email not currect",
      });
    }
    return res.json({
      email: data?.email,
      link: `http://localhost:8000/api/auth/reset-password/${data?.token}`,
    });
  } catch (err: any) {
    return next(err);
  }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
  const data = await service.resetPassword(req.body);
  console.log("[data]", data);
  if (data === null) {
    return res.status(400).json({
      status: "400",
      message: "Error!, Token expired",
    });
  }
  return res.json({
    status: "200",
    message: "Password reset successfully!",
  });
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.changePassword(req.body);
    if (data === null) {
      return res.json({
        status: "400",
        message: "something went wrong!",
      });
    }
    return res.json({
      status: "200",
      message: "Password changed successfully!",
    });
  } catch (err: any) {
    next(err);
  }
}

export {
  checkToken,
  changePassword,
  generateResetLink,
  resetPassword,
  signUp,
  signIn,
  signOut,
};

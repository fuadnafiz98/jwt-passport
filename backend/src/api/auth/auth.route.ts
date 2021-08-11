import express, { request } from "express";
import { celebrate, Joi } from "celebrate";
import {
  checkToken,
  changePassword,
  generateResetLink,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from "./auth.controller";

const router = express.Router();

import passport from "../../auth/passport";
import magicLogin from "../../auth/magicLogin";

router.post("/magic", magicLogin.send);
router.get("/magic/callback", (req, res) => {
  passport.authenticate("magiclogin", { session: false }, (err, user, info) => {
    console.log("---- [magic login] ----");
    console.log(err, user, info);
    return res.json(user);
  })(req, res);
});

router.post(
  "/signup",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    }),
  }),
  signUp
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  signIn
);

router.post("/signout", signOut);

router.get("/token", checkToken);

router.post(
  "/reset-password",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      token: Joi.string().required(),
    }),
  }),
  resetPassword
);

router.post(
  "/reset-link",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
    }),
  }),
  generateResetLink
);

router.post(
  "/change-password",
  // TODO: handleAuth here, user must be authenticated to change the password.
  celebrate({
    body: Joi.object({
      email: Joi.string().required(), //TODO: email not required if `handleAuth` is added.
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    }),
  }),
  changePassword
);

export default router;

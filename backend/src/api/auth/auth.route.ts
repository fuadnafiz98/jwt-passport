import express, { request } from "express";
import { celebrate, Joi } from "celebrate";
import { signIn, signOut, signUp, checkToken } from "./auth.controller";

const router = express.Router();

<<<<<<< HEAD
import passport from "../../auth/passport";
import magicLogin from "../../auth/magicLogin";
=======
import passport, { magicLogin } from "../../auth/passport";
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f

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

export default router;

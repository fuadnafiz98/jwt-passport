<<<<<<< HEAD
import passport from "passport";

import magicLogin from "./magicLogin";
import { jwtToken } from "./jwt";

passport.use(jwtToken);
passport.use(magicLogin);

=======
import { Request } from "express";
import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { StrategyOptions } from "passport-jwt";
import MagicLoginStrategy from "passport-magic-login";

/* ================MAGIC LOGIN =================== */
export const magicLogin = new MagicLoginStrategy({
  secret: "passwordless",
  // The authentication callback URL
  callbackUrl: "/api/auth/magic/callback",

  // Called with th e generated magic link so you can send it to the user
  // "destination" is what you POST-ed from the client
  // "href" is your confirmUrl with the confirmation token,
  // for example "/auth/magiclogin/confirm?token=<longtoken>"
  sendMagicLink: async (destination, href) => {
    console.log("destination", destination);
    console.log("link", href);
  },

  // Once the user clicks on the magic link and verifies their login attempt,
  // you have to match their email to a user record in the database.
  // If it doesn't exist yet they are trying to sign up so you have to create a new one.
  // "payload" contains { "destination": "email" }
  // In standard passport fashion, call callback with the error as the first argument (if there was one)
  // and the user data as the second argument!
  verify: (payload, callback) => {
    // Get or create a user with the provided email from the database
    console.log("payload =>", payload);
    if (payload === false) {
      return callback(undefined, { user: "none" });
    }
    return callback(undefined, { user: "user" });
  },
});

passport.use(magicLogin);

/* ================ JWT TOKEN =================== */

const getTokenFromCookie = (request: Request) => {
  let token = null;
  if (request && request.cookies) token = request.cookies["JWTToken"];
  console.log("auth/passport.js => ", token);
  return token;
};

const config: StrategyOptions = {
  // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: getTokenFromCookie,
  // TODO: use `dotenv`
  secretOrKey: "passwordless",
};

let ok = true;

passport.use(
  new JWTStrategy(config, function (payload, done) {
    console.log("payload => ", payload);
    // TODO: search in database??
    if (ok) {
      return done(null, payload);
    } else {
      return done(false);
    }
  })
);

>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
export default passport;

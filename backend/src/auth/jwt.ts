import jwt from "jsonwebtoken";
import { Request } from "express";
import { Strategy as JWTStrategy } from "passport-jwt";
import { StrategyOptions } from "passport-jwt";

import { Payload } from "../interfaces";

const getTokenFromCookie = (request: Request) => {
  let token = null;
  if (request && request.cookies) token = request.cookies["JWTToken"];
  console.log("auth/jwt.ts => ", token);
  return token;
};

const config: StrategyOptions = {
  jwtFromRequest: getTokenFromCookie,
  // TODO: use `dotenv`
  secretOrKey: "passwordless",
};

let ok = true;

const jwtToken = new JWTStrategy(config, function (payload, done) {
  console.log("payload => ", payload);
  // TODO: search in database??
  if (ok) {
    return done(null, payload);
  } else {
    return done(false);
  }
});

function generateToken(payload: Payload, isRefreshToken: boolean) {
  // const today = new Date();
  // const exp = new Date(today);
  // exp.setDate(today.getDate() + 30);

  console.log(`generating token for user: ${payload._id}`);
  return jwt.sign(
    {
      _id: payload._id,
      role: payload.role,
      name: payload.name,
      // exp: exp.getTime() / 1000,
    },
    isRefreshToken ? "nowwhat" : "passwordless",
    {
      expiresIn: isRefreshToken ? "90d" : "60s",
    }
  );
}

function validateToken(token: string, isRefreshToken: boolean) {
  try {
    const result = jwt.verify(
      token,
      isRefreshToken ? "nowwhat" : "passwordless"
    );
    console.log("jwt.ts", result);
    return result;
  } catch (err) {
    return null;
  }
}

export { jwtToken, generateToken, validateToken };

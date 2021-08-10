import passport from "passport";

import magicLogin from "./magicLogin";
import { jwtToken } from "./jwt";

passport.use(jwtToken);
passport.use(magicLogin);

export default passport;

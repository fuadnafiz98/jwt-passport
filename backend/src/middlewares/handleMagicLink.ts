<<<<<<< HEAD
import passport from "../auth/passport";
passport.authenticate("magiclogin", { session: false }, (err, user) => {
=======
import passport, { magicLogin } from "../auth/passport";
 passport.authenticate("magiclogin", { session: false }, (err, user) => {
>>>>>>> 62e9650ee9a1a5a3f82d117f11f379815e54367f
  console.log(user);
});

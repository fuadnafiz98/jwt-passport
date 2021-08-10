import passport from "passport";
import MagicLoginStrategy from "passport-magic-login";

/* ================MAGIC LOGIN =================== */
const magicLogin = new MagicLoginStrategy({
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

export default magicLogin;

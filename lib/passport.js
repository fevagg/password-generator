const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { login, signup } = require("../controller/users");
const { selectUserById } = require("../model/user");
require("dotenv").config({ path: "../port.env" });

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    }, login)
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    }, signup)
);

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser(async (id, next) => {
  const rows = await selectUserById(id);
  next(null, rows[0]);
});

const passport = require("passport");
const router = require("express").Router();

const {
  postSignup,
  postLogin,
  getGoogleCallback,
  getLogout,
} = require("../controllers/auth.controllers");

router.post("/signup", postSignup);

router.post("/login", postLogin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.BASE_URL}/login`,
    session: true,
  }),
  getGoogleCallback
);

router.get("/logout", getLogout);

module.exports = router;

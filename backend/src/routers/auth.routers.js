const passport = require("passport");
const router = require("express").Router();

const { postSignup, postLogin } = require("../controllers/auth.controllers");

router.post("/signup", postSignup);

router.post("/login", postLogin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.BASE_URL}/landing`,
    failureRedirect: `${process.env.BASE_URL}/login`,
    session: true,
  })
);

module.exports = router;

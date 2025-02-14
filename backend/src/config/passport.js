const UserService = require("../services/userService");
const userService = new UserService();
const JWTStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const getTokenFromCookie = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const options = {
  jwtFromRequest: getTokenFromCookie,
  secretOrKey: secretKey,
};
const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const { user } = await userService.findById(payload.userId);
    return done(null, user);
  } catch (error) {
    console.log("Error in passport", error);
    return done(error, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};

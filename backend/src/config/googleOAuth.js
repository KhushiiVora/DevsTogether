require("dotenv").config();
const UserService = require("../services/userService");
const userService = new UserService();
const { app } = require("../server");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

const googleStrategy = new GoogleStrategy(
  {
    clientID,
    clientSecret,
    callbackURL,
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log("in side google strategy callback");
    console.log("profile: ", profile._json);

    return done(null, profile);

    // const userId = profile.id;
    // const { user, error } = await userService.findUserByUserId(userId);
    // if (!user && !error) {
    //   // user = register function call
    // }
  }
);

module.exports = (passport) => {
  passport.use(googleStrategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  // refer techiescamp
  /*
  passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async(id, done) => {
        try{
            const user = await User.findById(id);
            done(null, user);
        }
        catch(err) {
            done(err, null);
        }
    });
  */
};

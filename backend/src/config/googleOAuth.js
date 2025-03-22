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
    const { name, email, picture } = profile._json;
    const userId = profile.id;

    const result = await userService.findByEmail(email);
    if (!result.user && !result.error) {
      const { user, error } = await userService.register({
        name,
        email,
        userId,
        picture,
      });
      if (user) return done(null, user);
      else return done(error, null);
    } else if (result.user) {
      return done(null, result.user);
    } else if (result.error) {
      console.log("Error in google OAuth:", result.error);
      return done(result.error, null);
    }
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

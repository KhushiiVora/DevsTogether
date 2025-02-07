require("dotenv").config();
const session = require("express-session");
const passport = require("passport");

const app = require("./server");
const configureGoogleOAuth = require("./config/googleOAuth");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // dont save session if nothing is modified
    resave: false,
    // save empty sessions
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

configureGoogleOAuth(passport);

app.get("/auth/signup", (req, res) => {
  res.send("Hello from backend");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    session: true,
  }),
  (req, res) => {
    try {
      // Ensure user is authenticated
      if (!req.user) {
        throw new Error("Authentication failed");
      }

      // You can perform additional operations here
      console.log("Authentication successful for user:", req.user.id);

      // Redirect to frontend
      res.redirect(`${process.env.BASE_URL}/signup`);
    } catch (error) {
      console.error("Callback error:", error);
      res.redirect(`${process.env.BASE_URL}/error`);
    }
  }
);

app.get("/auth/login/failed", (req, res) => {
  res.status(401).send("Couldn't authenticate");
});

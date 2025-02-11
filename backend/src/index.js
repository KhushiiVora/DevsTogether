require("dotenv").config();
const session = require("express-session");
const passport = require("passport");

const authRouter = require("./routers/auth.routers");

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

app.use("/auth", authRouter);

app.get("/auth/login/failed", (req, res) => {
  res.status(401).send("Couldn't authenticate");
});

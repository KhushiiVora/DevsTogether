require("dotenv").config();
const { ExpressPeerServer } = require("peer");
const { server } = require("./socket");
const session = require("express-session");
const passport = require("passport");

const authRouter = require("./routers/auth.routers");

const app = require("./server");
const configureGoogleOAuth = require("./config/googleOAuth");
const configurePassport = require("./config/passport");

const authMiddleware = passport.authenticate("jwt", { session: false });
// const peerServer = PeerServer({
//   port: process.env.PEER_SERVER_PORT,
//   path: process.env.PEER_SERVER_PATH,
//   allow_discovery: true,
//   proxied: process.env.NODE_ENV === "production",
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? {
//           key: process.env.SSL_KEY_PATH,
//           cert: process.env.SSL_CERT_PATH,
//         }
//       : undefined,
// });
const peerServer = ExpressPeerServer(server, {
  path: process.env.PEER_SERVER_PATH,
  allow_discovery: true,
});

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

configurePassport(passport);
configureGoogleOAuth(passport);

app.use("/peerjs", peerServer);
app.use("/auth", authRouter);

app.use(authMiddleware);
app.get("/user", (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in /user endpoint:", error);
    res.status(500).json({ error: "Server error" });
  }
});

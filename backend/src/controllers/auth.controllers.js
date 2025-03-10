const AuthService = require("../services/authService");
const ErrorService = require("../services/errorService");

const authService = new AuthService();
const errorService = new ErrorService();

const postSignup = async (req, res) => {
  const result = await authService.signup(req.body);
  if (result.error) {
    console.log("Error in postSignup: ", result.error);
    const error = errorService.handleError(result.error);
    res.status(error.status).send(error.message);
  }
  if (result.jwt) {
    res.cookie("token", result.jwt, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).send(result.user);
  }
};
const postLogin = async (req, res) => {
  const result = await authService.login(req.body);

  if (result.isLoggedIn) {
    res.cookie("token", result.jwt, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).send(result.user);
  } else {
    res.status(401).send("Invalid email or password!");
  }
};

const getGoogleCallback = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.redirect(`${process.env.BASE_URL}/login?error=auth_failed`);
    }

    const token = authService.generateToken(user._id);

    if (token) {
      res.cookie("token", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    // res.redirect(`${process.env.BASE_URL}/landing`);
    res.send(`
      <script>
        window.opener.postMessage(
          ${JSON.stringify({ status: "success", user: JSON.stringify(user) })}, 
          "${process.env.BASE_URL}"
        );
        window.close();
      </script>
    `);
  } catch (error) {
    console.error("Error in getGoogleCallback:", error);
    res.redirect(`${process.env.BASE_URL}/login?error=server_error`);
  }
};

const getLogout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0, httpOnly: true });
    res.status(200).send("Logged out successfully!");
  } catch (error) {
    console.log("Error in getLogout:", error);
    res.status(500).send("Unable to logout! Try again.");
  }
};

module.exports = { postSignup, postLogin, getGoogleCallback, getLogout };

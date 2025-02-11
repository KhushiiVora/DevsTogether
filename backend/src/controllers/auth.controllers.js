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
      maxAge: 24 * 60 * 60 * 1000,
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
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).send(result.user);
  } else {
    res.status(401).send("Invalid email or password!");
  }
};

module.exports = { postSignup, postLogin };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserService = require("./userService");
const userService = new UserService();

class AuthService {
  secret = process.env.JWT_SECRET_KEY;

  signup = async (data) => {
    const hashedPassword = await this.hashPassword(data.password);

    const { user, error } = await userService.register({
      ...data,
      password: hashedPassword,
    });
    if (error) return { isSignedUp: false, error };

    const token = this.generateToken(user._id);
    if (token) {
      return { isSignedUp: true, jwt: token, user };
    } else {
      return { isSignedUp: true };
    }
  };

  login = async (data) => {
    const { email, password } = data;
    const { user } = await userService.findByEmail(email);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) return { isLoggedIn: false };

      const token = this.generateToken(user._id);

      if (token) {
        return { isLoggedIn: true, jwt: token, user: user.toJSON() };
      }
    }
    return { isLoggedIn: false };
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  generateToken(userId) {
    try {
      const payload = { userId };
      const options = { expiresIn: "1d" };
      const token = jwt.sign(payload, this.secret, options);
      return token;
    } catch (error) {
      console.log("Error AuthService  (generating token): ", error);
      return null;
    }
  }
}

module.exports = AuthService;

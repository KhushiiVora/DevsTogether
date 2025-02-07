const User = require("../models/user");

class UserService {
  async register(data) {
    // remaining
  }
  async findUserByUserId(userId) {
    try {
      const user = await User.findOne({ userId });
      return { user };
    } catch (error) {
      console.log("Error in findByUserId service: ", error);
      return { error };
    }
  }
}

module.exports = UserService;

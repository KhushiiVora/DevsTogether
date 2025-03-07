const User = require("../models/user");

class UserService {
  async register(data) {
    const user = new User(data);
    try {
      const savedUser = await user.save();
      return { user: savedUser.toJSON() };
    } catch (error) {
      console.log("Error in register user service:", error);
      return { error };
    }
  }
  async findByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return { user };
    } catch (error) {
      console.log("Error in findByEmail service: ", error);
      return { error };
    }
  }
  // remove if not needed
  async findByUserId(userId) {
    try {
      const user = await User.findOne({ userId }).select("-password");
      return { user };
    } catch (error) {
      console.log("Error in findByUserId service: ", error);
      return { error };
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id).select("-password");
      return { user };
    } catch (error) {
      console.log("Error in findById user service:", error);
      return { error };
    }
  }
}

module.exports = UserService;

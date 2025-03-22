const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      validate: (value) => validator.isAlpha(validator.blacklist(value, " ")),
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      trim: true,
      validate: (value) => validator.isStrongPassword(value),
    },
    picture: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: {
      transform: function (doc, user) {
        delete user.password;
        return user;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

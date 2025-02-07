const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
    trim: true,
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
    required: true,
    trim: true,
    validate: (value) => validator.isStrongPassword(value),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

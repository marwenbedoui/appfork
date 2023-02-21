const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["simpleUser", "admin", "tester"],
    default:"simpleUser",
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
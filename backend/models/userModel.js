const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
    lowercase: true,
  },
  firstname: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Define the regular expression for email validation
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["simpleUser", "admin", "tester"],
    default: "simpleUser",
    required: true,
  },
  image: { type: Buffer }
});

const User = mongoose.model("user", userSchema);

module.exports = User;

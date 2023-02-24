const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  protocol: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model("test", testSchema);

module.exports = Test;

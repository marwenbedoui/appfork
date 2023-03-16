const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
    },
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
      // required: true,
    },
    path: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      // required: true,
    },
    data:
    {
      type: String,
    },
    detail: [
      {
        cpu: {
          type: String,
        },
        memory: {
          type: String,
        },
        timestamp: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("test", testSchema);

module.exports = Test;

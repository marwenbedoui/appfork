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
    },
    pourcentage: {
      passed: {
        type: String,
      },
      failed: {
        type: String,
      },
    },

    usersNumber: {
      required: true,
      type: Number,
    },
    data: {
      type: String,
    },
    linkRepo: {
      type: String,
    },
    file: {
      type: String,
    },
    cpuCapacity: {
      type: Number,
    },
    memoryCapacity: {
      type: Number,
    },
    added_lines: {
      type: Number,
    },
    removed_lines: {
      type: Number,
    },
    loops_add: {
      type: Number,
    },
    loops_remove: {
      type: Number,
    },
    conditions_add: {
      type: Number,
    },
    conditions_remove: {
      type: Number,
    },
    detail: [
      {
        cpu: {
          type: Number,
        },
        memory: {
          type: Number,
        },
        network: {
          received: {
            type: Number,
          },
          transferred: {
            type: Number,
          },
        },
        disk: {
          type: Number,
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

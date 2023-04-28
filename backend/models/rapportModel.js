const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  timeStamp: {
    type: Date,
    required: true,
  },
  elapsed: {
    type: Number,
    required: true,
  },
  bytes: {
    type: Number,
    required: true,
  },
  sentBytes: {
    type: Number,
    required: true,
  },
  Latency: {
    type: Number,
    required: true,
  },
  Connect: {
    type: Number,
    required: true,
  },
  processTime: {
    type: Number,
    required: true,
  },
  responseCode: {
    type: Number,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
  },
  addedCode: {
    type: String,
  },
  removedCode: {
    type: String,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "test",
  },
});

const Rapport = mongoose.model("rapport", rapportSchema);

module.exports = Rapport;

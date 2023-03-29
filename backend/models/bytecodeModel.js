const mongoose = require("mongoose");

const bytecodeSchema = new mongoose.Schema({
  timeStamp: {
    type: Date,
    required: true,
  },
  bytes: {
    type: Buffer,
    //required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "test",
  },
});


const Bytecode = mongoose.model("bytecode", bytecodeSchema);

module.exports = Bytecode;

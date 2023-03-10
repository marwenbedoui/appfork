const mongoose = require("mongoose");

const testDetailSchema = new mongoose.Schema(
    {
        cpu: {
            type: String,
            required: true,
        },
        memory: {
            type: String,
            required: true,
        },
    }
);

const TestDetail = mongoose.model("testDetail", testDetailSchema);

module.exports = TestDetail;

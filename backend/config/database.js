const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  //Line added to avoid deprecation
  mongoose.set('strictQuery', true);
  //
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Database connection failed", err);
      process.exit();
    });
};

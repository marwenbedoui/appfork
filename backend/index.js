const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//routers path
const testerRouter = require("./routers/testerRouter");
const usersRouter = require("./routers/usersRouter");
const adminRouter = require("./routers/adminRouter");

//server express
const app = express();
app.use(cookieParser());

// connexion avec la base de données
require("dotenv").config();
require("./config/database").connect();

const PORT = process.env.PORT || 5000;

// donner une exception à la partie react de consommer le backend
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//routers
app.use("/api/v1", testerRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1", adminRouter);

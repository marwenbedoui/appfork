const express = require("express");
const cors = require("cors");

// connexion avec la base de données
require("dotenv").config();
require("./config/database").connect();

const app = express();

// donner une exception à la partie react de consommer le backend
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

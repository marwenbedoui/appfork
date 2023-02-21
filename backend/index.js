const express = require("express");
const cors = require("cors");
//routers path
const testerRouter=require("./routers/testerRouter")

// connexion avec la base de données
require("dotenv").config();
require("./config/database").connect();

const PORT = process.env.PORT || 5000;
 //server express
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




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//routers
app.use("/api/v1",testerRouter);

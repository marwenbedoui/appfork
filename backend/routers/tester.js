module.exports = (app) => {
  const tester = require("../controllers/tester");
  var router = require("express").Router();

  router.get("/", tester.test);

  app.use("/", router);
};

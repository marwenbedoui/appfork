const router = require("express").Router();
const testerController = require("../controllers/testerController");
const auth = require("../middlewares/Auth");

router.post("/tester/test", auth, testerController.executeTest);
//get test
router.get("/tester/test/", auth, testerController.getAllTests);

module.exports = router;

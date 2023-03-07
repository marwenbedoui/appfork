const router = require("express").Router();
const testerController = require("../controllers/testerController");
const auth = require("../middlewares/Auth");

router.post("/tester/test", auth, testerController.executeTest);
//get test
router.get("/tester/test/", auth, testerController.getAllTests);
router.get("/tester/test/result", auth, testerController.getResults);

module.exports = router;

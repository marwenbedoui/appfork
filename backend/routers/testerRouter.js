const router = require("express").Router();
const testerController = require("../controllers/testerController");
const { isUser } = require("../middlewares/Auth");

router.post("/tester/test", isUser, testerController.executeTest);
//get test
router.get("/tester/test/", isUser, testerController.getAllTests);
router.get("/tester/test/result", isUser, testerController.getResults);

module.exports = router;

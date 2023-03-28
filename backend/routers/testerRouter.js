const router = require("express").Router();
const testerController = require("../controllers/testerController");
const { isUser } = require("../middlewares/Auth");

router.post("/tester/test", isUser, testerController.executeTest);
//get test
router.get("/tester/test/", isUser, testerController.getAllTests);
router.get("/tester/test/number", isUser, testerController.TestStatePerUser);
router.get("/tester/test/all/", isUser, testerController.TestsPerUser);
router.get("/tester/test/:id", isUser, testerController.getTestById);

module.exports = router;

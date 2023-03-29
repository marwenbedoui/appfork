const router = require("express").Router();
const testerController = require("../controllers/testerController");
const { isUser } = require("../middlewares/Auth");
const multer = require("multer");

//initializing multer
//creating image storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/bytecode");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/tester/test", upload, isUser, testerController.executeTest);
//get test
router.get("/tester/test/", isUser, testerController.getAllTests);
router.get("/tester/test/number", isUser, testerController.TestStatePerUser);
router.get("/tester/test/all/", isUser, testerController.TestsPerUser);
router.get("/tester/test/:id", isUser, testerController.getTestById);

module.exports = router;

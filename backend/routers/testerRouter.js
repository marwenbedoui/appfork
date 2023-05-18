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

const upload = multer({ storage: storage });

router.post(
  "/tester/test",
  upload.array("files"),
  isUser,
  testerController.executeTest
);
//get test
router.get("/tester/test/", isUser, testerController.getAllTests);
router.get("/tester/test/tester", isUser, testerController.getAllTestsByTester);
router.get("/tester/test/number", isUser, testerController.AllTestsState);
router.get("/tester/test/all/", isUser, testerController.TestsPerUser);
router.get("/tester/test/:id", isUser, testerController.getTestById);
router.post("/tester/test/predict", isUser, testerController.prePredictTest);

module.exports = router;

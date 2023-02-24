const router = require("express").Router();
const testerController = require("../controllers/testerController");
const auth = require("../middlewares/Auth");

//register
router.post("/register", testerController.register);
//login
router.post("/login", testerController.login);
//logout
router.get("/logout", testerController.logout);
//verify login
router.get("/loggedIn", testerController.verifyLoggedIn);
//update password
router.put("/update-password", auth, testerController.updatePassword)
//update lastname and firstname
router.put("/update-names", auth, testerController.updateInfo)
//update mail
router.put("/update-mail", auth, testerController.updateMail)
//execute test
router.post("/tester/test", auth, testerController.executeTest);
//get test
router.get("/tester/test/", auth, testerController.getAllTests);
module.exports = router;

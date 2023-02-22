const router = require("express").Router();
const testerController = require("../controllers/testerController");
//const auth = require("../middlewares/Auth");

//register
router.post("/register", testerController.register)
//login
router.post("/login", testerController.login)
//logout
router.get("/logout", testerController.logout)
//verify login
router.get("/loggedIn", testerController.verifyLoggedIn)


module.exports = router;

const router = require("express").Router();
const usersController = require("../controllers/usersController");
const auth = require("../middlewares/Auth");

//login
router.post("/login", usersController.login);
//logout
router.get("/logout", usersController.logout);
//verify login
router.get("/loggedIn", usersController.verifyLoggedIn);
//update password
router.put("/update-password", auth, usersController.updatePassword);
//update lastname and firstname
router.put("/update-names", auth, usersController.updateInfo);
//update mail
router.put("/update-mail", auth, usersController.updateMail);
//get user info
router.get("/get-info", auth, usersController.getInfo);

module.exports = router;

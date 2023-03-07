const router = require("express").Router();
const usersController = require("../controllers/usersController");
const { isUser } = require("../middlewares/Auth");

//login
router.post("/login", usersController.login);
//logout
router.get("/logout", usersController.logout);
//verify login
router.get("/loggedIn", usersController.verifyLoggedIn);
//update password
router.put("/update-password", isUser, usersController.updatePassword);
//update lastname and firstname
router.put("/update-names", isUser, usersController.updateInfo);
//update mail
router.put("/update-mail", isUser, usersController.updateMail);
//get user info
router.get("/get-info", isUser, usersController.getInfo);

module.exports = router;

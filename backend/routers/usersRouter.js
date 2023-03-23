const router = require("express").Router();
const usersController = require("../controllers/usersController");
const { isUser } = require("../middlewares/Auth");
const multer = require("multer");

//initializing multer
//creating image storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

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
//update user image
router.put("/update-image", upload, isUser, usersController.updateImage);

module.exports = router;

const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middlewares/Auth");

//register
router.post("/register", isAdmin, adminController.register);

module.exports = router;

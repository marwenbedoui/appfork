const router = require("express").Router();
const adminController = require("../controllers/adminController");

//register
router.post("/register", adminController.register);

module.exports = router;

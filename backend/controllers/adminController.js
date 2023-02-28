const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//function : adding user
const register = async (req, res) => {
  try {
    const { lastname, firstname, email, password, passwordVerify, role } =
      req.body;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]\\|;:'",.<>\/?])[A-Za-z\d!@#$%^&*()\-_=+{}[\]\\|;:'",.<>\/?]{8,}$/;

    //finding if existing user with the same email
    const existingUser = await User.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An account with those informations already exists" });
    }

    if (
      !email ||
      !password ||
      !passwordVerify ||
      !lastname ||
      !firstname ||
      !role
    ) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    } else if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({ error: "Invalid password : Password must contain ..." });
    } else if (password !== passwordVerify) {
      return res.status(400).json({ error: "Please enter the same password" });
    }

    //hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save a new user account to database
    await new User({
      email,
      lastname,
      firstname,
      passwordHash,
      role,
    }).save();

    res.status(200).send({ message: "Registred successfully!" });
  } catch (error) {
    // res.json({ message: error });
    res.status(500).send({ message: error.message });
  }
};

//exports
exports.register = register;

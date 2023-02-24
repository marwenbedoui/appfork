const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//model
const jwt = require("jsonwebtoken");
const Test = require("../models/testModel");

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

//function : login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).send({ message: "Invalid email or password" });
    } else {
      // Compare passwords
      const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
      if (isMatch) {
        // Generate a JSON Web Token (JWT)
        const token = jwt.sign(
          {
            userId: existingUser._id,
            userRole: existingUser.role,
          },
          process.env.TOKEN_KEY
        );
        res.header("Authorization", `${token}`);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.send({
          message: "Logged in successfully!",
          token: token,
        });
      } else {
        res.status(400).send({ message: "Invalid email or password" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//function : logout user
const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send({ message: "logged out successfully" });
};

//function : verify if the user is logged in or not
const verifyLoggedIn = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.send({
        loggedIn: false,
        userId: "null",
        role: "null",
      });
    } else {
      const verified = jwt.verify(token, process.env.TOKEN_KEY);
      res.send({
        loggedIn: true,
        userId: verified.userId,
        role: verified.userRole,
      });
    }
  } catch (error) {
    res.json({ message: "some error happened" });
  }
};

const executeTest = (req, res) => {
  const test = new Test({
    protocol: req.body.protocol,
    url: req.body.url,
    port: req.body.port,
    path: req.body.path,
    method: req.body.method,
  });

  test
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

const getAllTests = (req, res) => {
  Test.find();
  var total = Test.count();
  Test.find()
    .then((data) => {
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", total);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

//exports
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.verifyLoggedIn = verifyLoggedIn;
exports.executeTest = executeTest;
exports.getAllTests = getAllTests;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//model
const Test = require("../models/testModel");
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
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

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

//function : updating password
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, newPasswordConfirm } = req.body;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]\\|;:'",.<>\/?])[A-Za-z\d!@#$%^&*()\-_=+{}[\]\\|;:'",.<>\/?]{8,}$/;
    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    if (!passwordRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ error: "Invalid password : Password must contain ..." });
    }
    if (newPassword !== newPasswordConfirm) {
      return res.status(400).json({ error: "Please enter the same password" });
    }

    const user = await User.findById({ _id: req.userId });
    const passwordCorrect = await bcrypt.compare(
      oldPassword,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Wrong password entered",
      });
    } else {
      const salt = await bcrypt.genSalt();
      const newPasswordHash = await bcrypt.hash(newPassword, salt);
      user.passwordHash = newPasswordHash;
      await user.save();
      return res.json({ message: "Password updated successfully" });
    }
  } catch (error) {
    return res.json({ message: "error in updating password" });
  }
};
//function : updating lastname and firstname
const updateInfo = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;

    User.findByIdAndUpdate(
      req.userId,
      { firstname, lastname },
      { new: true },
      (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error");
        }
        res.send({ message: "names updated successfully" });
      }
    );
  } catch (error) {
    return res.json({ message: "error in updating name" });
  }
};

const updateMail = async (req, res) => {
  try {
    const { newMail, password, newMailRetype } = req.body;

    const user = await User.findById({ _id: req.userId });

    if (!newMail || !password || !newMailRetype) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    if (newMail !== newMailRetype) {
      return res.status(400).json({ error: "Please enter the same mail" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Wrong Password entered",
      });
    }

    //existing user with same new username
    const emailTaken = await User.findOne({ email: newMail });
    if (emailTaken) {
      return res
        .status(400)
        .json({ error: "An account with this email already exists" });
    }

    // Update email
    user.email = newMail;
    await user.save();

    res.status(200).send({ message: "Email updated successfully" });
  } catch (error) {
    return res.json({ message: "error in updating mail" });
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId });
    res.send(user);
  } catch (error) {
    return res.json({ message: "error in getting informations" });
  }
}

//exports
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.verifyLoggedIn = verifyLoggedIn;
exports.executeTest = executeTest;
exports.getAllTests = getAllTests;
exports.updatePassword = updatePassword;
exports.updateInfo = updateInfo;
exports.updateMail = updateMail;
exports.getInfo = getInfo;

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//model
const jwt = require("jsonwebtoken");

//function : adding user
const register = async (req, res) => {
  try {
    const { lastname, firstname, email, password, passwordVerify, role } =
      req.body;

    //validation
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
    } else if (password.length < 8) {
      return res.status(400).json({ error: "Password must be 8" });
    } else if (password !== passwordVerify) {
      return res.status(400).json({ error: "Please enter the same password" });
    }

    //finding if existing user with the same email
    const lcemail = email.toLowerCase();
    const lclastname = lastname.toLowerCase();
    const lcfirstname = firstname.toLowerCase();
    const existingUser = await User.findOne({
      $or: [
        { email: lcemail },
        { $and: [{ lastname: lclastname }, { firstname: lcfirstname }] },
      ],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An account with those informations already exists" });
    }

    //hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save a new user account to database

    const newUser = new User({
      email: lcemail,
      lastname: lclastname,
      firstname: lcfirstname,
      passwordHash,
      role,
    });
    const savedUser = await newUser.save();

    //Creating the token
    const token = jwt.sign(
      {
        user: savedUser._id,
        userRole: savedUser.role,
      },
      process.env.TOKEN_KEY
    );

    //send the token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ message: "Registred successfully!" });
  } catch (error) {
    res.json(error);
    res.status(500).send({ error: "error in registring" });
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
    const lcemail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lcemail });
    if (!existingUser) {
      return res.status(401).json({
        error: "Wrong email or password",
      });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Wrong email or password",
      });
    }
    //Creating the token

    const token = jwt.sign(
      {
        user: existingUser._id,
        userRole: existingUser.role,
      },
      process.env.TOKEN_KEY
    );
    //send the token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ message: "Logged in successfully!" });
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
const verifyLoggedIn = (req,res)=>{
  try {
    const token = req.cookies.token;

    if (!token) {
      res.send({
        loggedIn: false,
        role: "null",
        userid: "null",
      });
    } else {
      const verified = jwt.verify(token, process.env.TOKEN_KEY);
      res.send({
        loggedIn: true,
        userid: verified.user,
        role: verified.userRole,
      });
    }
  } catch (error) {
    res.json({"message" : false});
  }
}

//exports
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.verifyLoggedIn=verifyLoggedIn

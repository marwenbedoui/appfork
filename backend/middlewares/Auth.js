const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = verified.user;
    req.userRole = verified.userRole;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ errorMessage: "Unauthorized Error" });
  }
}

module.exports = auth;

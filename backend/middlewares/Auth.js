const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = verified.userId;
    req.userRole = verified.userRole;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ errorMessage: "Unauthorized Error" });
  }
}

module.exports = auth;

const jwt = require("jsonwebtoken");
// Admin middleware function
function isAdmin(req, res, next) {
  // Check if the user is an admin
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
  const verified = jwt.verify(token, process.env.TOKEN_KEY);
  req.userId = verified.userId;
  req.userRole = verified.userRole;
  if (req.userId && req.userRole === "admin") {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
} // User middleware function
function isUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
  const verified = jwt.verify(token, process.env.TOKEN_KEY);
  req.userId = verified.userId;
  req.userRole = verified.userRole;
  // Check if the user is authenticated
  if (req.userId) {
    // User is authenticated, call the next middleware function
    return next();
  } else {
    // User is not authenticated, return an error response
    return res.status(401).json({ message: "Unauthorized" });
  }
}
exports.isAdmin = isAdmin;
exports.isUser = isUser;

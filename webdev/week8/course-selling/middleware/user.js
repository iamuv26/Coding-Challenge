const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");

function userMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "Token missing" });
    }

    const actual = token.split(" ")[1];
    const decoded = jwt.verify(actual, JWT_USER_SECRET);

    req.userID = decoded.id;
    next();

  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token",
      error: err.message
    });
  }
}

module.exports = {
  userMiddleware
};

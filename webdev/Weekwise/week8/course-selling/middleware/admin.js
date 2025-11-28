const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({
        message: "Token missing"
      });
    }

    // Extract token
    let token = authHeader;

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

    // Save user ID
    req.userId = decoded.id;   // ✔ correct spelling

    next();
  } 
  catch (err) {
    console.log("JWT ERROR →", err);
    return res.status(403).json({
      message: "Token is invalid"
    });
  }
}

module.exports = {
  adminMiddleware
};

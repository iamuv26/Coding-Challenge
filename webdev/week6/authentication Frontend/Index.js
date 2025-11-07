const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Yuvraj@123";
const app = express();
app.use(express.json());
const users = [];

function logger(req,res,next){
    console.log(req.method + " request Came");
    next()
}
// Signup Route
app.post("/signup",logger ,(req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ message: "username and password required" });

  users.push({ username, password });
  return res.json({ message: "Signup successful" });
});


// Signin Route
app.post("/signin", logger,(req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ message: "username and password required" });

  const foundUser = users.find((u) => u.username === username && u.password === password);
  if (!foundUser)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  return res.json({ token });
});

// Auth Middleware
function auth(req, res, next) {
  const token = req.headers.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token)
    return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
// Protected Route
app.get("/me", logger, auth, (req, res) => {
  const foundUser = users.find((u) => u.username === req.username);
  if (!foundUser)
    return res.status(404).json({ message: "User not found" });

  return res.json({ username: foundUser.username });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));

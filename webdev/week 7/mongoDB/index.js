// ===============================
// 📦 IMPORTS
// ===============================
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { z } = require("zod");
const { UserModel, TodoModel } = require("./Db"); // MongoDB models

// ===============================
// 🔐 CONFIG
// ===============================
const JWT_SECRET = "Yuvraj@123";
const app = express();

app.use(express.json()); // Parse JSON body
app.use(cors()); // Allow cross-origin requests

// ===============================
// 🧩 ZOD SCHEMAS — Data Validation
// ===============================

// ✅ Signup schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email format"), // ✅ .trim() added
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// ✅ Signin schema
const signinSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// ✅ Todo schema
const todoSchema = z.object({
  title: z.string().min(1, "Todo title is required"),
});

// ===============================
// 🧾 SIGNUP — Create Account
// ===============================
app.post("/signup", async (req, res) => {
  try {
    console.log("📩 Received signup body:", req.body);

    // Validate input
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message);
      return res.status(400).json({ errors });
    }

    const { email, password, name } = parsed.data;

    // Check if user exists
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({ email, password: hashed, name });

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 🔐 SIGNIN — Login User
// ===============================
app.post("/signin", async (req, res) => {
  try {
    console.log("📩 Received signin body:", req.body);

    // Validate input
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message);
      return res.status(400).json({ errors });
    }

    const { email, password } = parsed.data;

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Signin successful",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("❌ Signin error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 🛡️ AUTH MIDDLEWARE
// ===============================
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ===============================
// 👤 GET CURRENT USER
// ===============================
app.get("/me", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ /me error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 📝 CREATE TODO
// ===============================
app.post("/todo", auth, async (req, res) => {
  try {
    const parsed = todoSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message);
      return res.status(400).json({ errors });
    }

    const { title } = parsed.data;

    const todo = await TodoModel.create({
      title,
      done: false,
      userID: req.user.id,
    });

    res.status(201).json({ message: "Todo created", todo });
  } catch (err) {
    console.error("❌ Todo creation error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 📜 GET ALL TODOS
// ===============================
app.get("/todo", auth, async (req, res) => {
  try {
    const todos = await TodoModel.find({ userID: req.user.id });
    res.json({ todos });
  } catch (err) {
    console.error("❌ Get todos error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 🚀 START SERVER
// ===============================
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);

const express = require("express");
const { UserModel, TodoModel, mongoose } = require("./Db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "Yuvraj@123";

const app = express();
app.use(express.json());

// Signup - create a new user
app.post("/signup", async function (req, res) {
    try {
        const { email, password, name } = req.body || {};
        if (!email || !password) return res.status(400).json({ message: "email and password required" });

        // prevent duplicate email in this simple mock
        const existing = await UserModel.findOne({ email });
        if (existing) return res.status(409).json({ message: "User already exists" });

        const user = await UserModel.create({ email, password, name });
        return res.status(201).json({ message: "Signup successful", user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// Signin - authenticate and return token
app.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) return res.status(400).json({ message: "email and password required" });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// Simple auth middleware
function auth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.token;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

// Protected route to get current user
app.get("/me", auth, async function (req, res) {
    try {
        const user = await UserModel.findOne({ _id: req.user.id });
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json({ id: user._id, email: user.email, name: user.name });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// Basic todo creation (requires auth)
app.post("/todo", auth, async function (req, res) {
    try {
        const { title } = req.body || {};
        if (!title) return res.status(400).json({ message: "title required" });
        const todo = await TodoModel.create({ title, done: false, userID: req.user.id });
        return res.status(201).json({ todo });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
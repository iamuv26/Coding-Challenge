const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

// ✅ import models and connection from Db.js
const { UserModel, TodoModel } = require("./Db");

const JWT_SECRET = "Yuvraj@123";
const app = express();

app.use(express.json());
app.use(cors());

/******** SIGNUP ********/
app.post("/signup", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "email and password required" });

        const existing = await UserModel.findOne({ email });
        if (existing)
            return res.status(409).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await UserModel.create({ email, password: hashed, name });
        return res.status(201).json({
            message: "Signup successful",
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/******** SIGNIN ********/
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "email and password required" });

        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/******** AUTH MIDDLEWARE ********/
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token)
        return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

/******** GET CURRENT USER ********/
app.get("/me", auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/******** CREATE TODO ********/
app.post("/todo", auth, async (req, res) => {
    try {
        const { title } = req.body;
        if (!title)
            return res.status(400).json({ message: "title required" });

        const todo = await TodoModel.create({
            title,
            done: false,
            userID: req.user.id
        });

        res.status(201).json({ todo });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/******** GET TODOS ********/
app.get("/todo", auth, async (req, res) => {
    const todos = await TodoModel.find({ userID: req.user.id });
    res.json({ todos });
});

/******** START SERVER ********/
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

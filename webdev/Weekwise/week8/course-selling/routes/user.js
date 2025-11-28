const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { JWT_USER_SECRET } = require("../config");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

// ---------------- ZOD SCHEMAS ----------------
const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" })
});

const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

// ---------------- SIGNUP ----------------
userRouter.post("/signup", async function (req, res) {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: parsed.error.errors
            });
        }

        const { email, password, firstName, lastName } = parsed.data;

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({ message: "Signup succeeded" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Signup failed" });
    }
});

// ---------------- SIGNIN ----------------
userRouter.post("/signin", async function (req, res) {
    try {
        const parsed = signinSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: parsed.error.errors
            });
        }

        const { email, password } = parsed.data;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        // compare password
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_SECRET);

        // cookie logic
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.json({ message: "Signin success" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Signin failed" });
    }
});

// ---------------- PURCHASES ----------------
userRouter.get("/purchases", userMiddleware, async function (req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({ userId });

    const purchasedCourseIds = purchases.map(p => p.courseId);

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    });

    res.json({ purchases, coursesData });
});

// ---------------- LOGOUT ----------------
userRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});

module.exports = { userRouter };

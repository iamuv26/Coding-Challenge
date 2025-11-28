require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

// Parse JSON
app.use(express.json());

// Parse Cookies
app.use(cookieParser());  // <<---- IMPORTANT

// Mount routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🌿 Connected to MongoDB");

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main();

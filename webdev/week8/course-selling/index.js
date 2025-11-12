const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");

const app = express();

// Mount routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

// Start the server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

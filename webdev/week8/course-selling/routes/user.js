const { Router } = require("express"); // ✅ Import Express Router
const userRouter = Router();           // ✅ Create router object

// Define routes on userRouter
userRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signup endpoint",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "Signin endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchases endpoint",
  });
});

// ✅ Export properly
module.exports = {
  userRouter,
};

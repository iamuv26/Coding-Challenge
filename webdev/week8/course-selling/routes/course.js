const { Router } = require("express");
const courseRouter = Router();

// Get all courses
courseRouter.get("/", function (req, res) {
  res.json({
    message: "All courses endpoint",
  });
});

// Get all purchases (for admin maybe)
courseRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Courses purchase endpoint",
  });
});

// Export properly
module.exports = {
  courseRouter,
};

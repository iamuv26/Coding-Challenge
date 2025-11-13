const { Router } = require("express"); // ✅ Import Express Router
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = Router();           // ✅ Create router object
const JWT_SECRET = "Yuvraj@123"
// Define routes on userRouter
userRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    // Create user
    await userModel.create({
      email,
      password : hashedPassword,
      firstName,
      lastName
    });

    res.json({
      message: "User created successfully"
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});


userRouter.post("/signin", async function (req, res) {
  try{
    const{email,password}= req.body;
    
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(400).json({
        message:"user not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
      return res.status(401).json({
        message: "incorrect password"
      });
    }
  
  const token = jwt.sign(
    {id: user._id , email: user.email},JWT_SECRET
  );

  res.json({
    message: "Signin succesfully",
    token : token
  });
}
catch(err){
  console.log(err);
  res.status(500).json({
    message: "something went wrong"
  })
}
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

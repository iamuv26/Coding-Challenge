const { Router } = require ("express");
const adminRouter = Router();

adminRouter.post("/signup", function(req,res){
    res.json({
        message : "admin Signup"
    })
})

adminRouter.post("/signin", function(req,res){
    res.json({
        message : "admin Signup Yuvraj"
    })
})

adminRouter.post("/course", function(req,res){
    res.json({
        message : "admin Signup"
    })
})
adminRouter.put("/course", function(req,res){
    res.json({
        message : "admin Signup"
    })
})
adminRouter.post("/course/bulk", function(req,res){
    res.json({
        message : "admin Signup"
    })
})

module.exports = {
    adminRouter : adminRouter
}
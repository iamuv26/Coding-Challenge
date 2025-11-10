const express = require ("express");

const app = express();

app.post("/user/signup", function(req,res){
    res.json({
       message : "why are you are"
    })
  })  
app.post("/user/signin", function(req,res){
    res.json({
       message : "why are you are"
    })
})
app.post("/user/purchase", function(req,res){
    res.json({
       message : "why are you are"
    })
})
app.post("/user/purchase", function(req,res){
    res.json({
       message : "why are you are"
    })
})
app.get("/users/courses", function(req,res){
    res.json({
       message : "why are you are"
    })
})


app.listen(3000,() => 
console.log("server Connect at 3000")
);

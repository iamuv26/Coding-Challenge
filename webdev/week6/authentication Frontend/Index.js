const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Yuvraj@123";

const app = express();

app.use(express.json());

const users = [];

app.post("/signup", function(req,res){
    const username = req.body.username
    const password = req.body.password

    users.push({
        username : username,
        password : password
    })
    ''
    res.json({
        message:"Yuvraj Aapne Signup Kar liya hai"
    })

})

app.post("/signin", function(req,res){
    const username = req.body.username
    const password = req.body.password

    let foundUser = null;

    for(let i =0;i<users.length;i++){
        if(users[i].username === username && user[i].password === password){
            foundUser = users[i]
        }
    }

    if(!foundUser){
        res.json({
            message : "Crediantial not found"
        })
        return
    }
    else{
        const token = jwt.sign({
            username
        },JWT_SECRET)

        res.json({
            token:token
        })
    }

    
})

app.get("/me", function(req,res){
    
})

app.listen(3000() => {
    console.log('Authentication server running on http://localhost:3000');
});
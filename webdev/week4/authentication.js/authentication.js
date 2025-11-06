const express = require('express');

const app = express();

app.use(express.json());

const users = [];


function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 
        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
        'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signup", function(req,res){

    //input validation
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You are signed in"
    })

    console.log(users)

})

app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    let foundUser = null;

    for(let i = 0; i<users.length;i++){
        if (users[i].username == username && users[i].password == password){
            foundUser = users[i]
        }
    }

    if(foundUser){
        const token = generateToken();
        foundUser.token = token;
        // return token in a `token` field (easier for clients)
        res.json({
            token: token
        });

        console.log(users);
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        });
    }
})

app.get("/me", (req, res) => {
    // Support tokens sent as:
    // - Authorization: Bearer <token>
    // - Authorization: <token>
    // - ?token=<token>
    let authHeader = req.headers.authorization || req.headers.Authorization || "";
    let token = authHeader;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7).trim();
    }
    if (!token && req.query && req.query.token) {
        token = req.query.token;
    }

    const user = users.find(user => user.token === token);
    if (user) {
        res.send({
            username: user.username
        });
    } else {
        res.status(401).send({
            message: "Unauthorized"
        });
    }
});
app.listen(3001, () => {
    console.log('Authentication server running on http://localhost:3001');
});
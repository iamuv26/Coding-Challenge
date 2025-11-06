const express = require('express');
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log(`Hostname: ${req.hostname}`);
    next();
});

// Test Routes
app.get('/', (req, res) => {
    res.send(`Hello from ${req.hostname}`);
});

app.get('/test', (req, res) => {
    res.send(`This is test route on host: ${req.hostname}`);
});

// Start server
app.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});

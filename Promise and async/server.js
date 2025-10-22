const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '221025.html'));
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

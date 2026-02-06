const express = require('express')
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/api/words', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(3000, () => console.log("Start server at 3000"));
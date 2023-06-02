const express = require('express');
const path = require('path');
const app = express();
const port = 8000;


app.use(express.static(path.join(__dirname, 'euro-kat/build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'euro-kat/build', 'index.html'));
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'API response' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


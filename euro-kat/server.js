const express = require('express');
const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public'))); // TODO: Look later if actually needed

app.get('/api/data', (req, res) => {
  res.json({ message: 'API response' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
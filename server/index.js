const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//serves static files from client/public
const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

// fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
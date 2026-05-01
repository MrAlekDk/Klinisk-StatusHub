require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

//serves static files from client/dist/client/browser
const publicPath = path.join(__dirname, '../client/dist/client/browser');
app.use(express.static(publicPath));

// fallback route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
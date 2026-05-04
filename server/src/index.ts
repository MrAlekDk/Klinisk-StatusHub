import 'dotenv/config';
import express = require("express");
import path = require('path');
import apiRouter from './routes/api.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', apiRouter);

//serves static files from client/dist/client/browser
const publicPath = path.join(__dirname, '../../client/dist/client/browser');
app.use(express.static(publicPath));

// fallback route
app.get(/.*/, (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
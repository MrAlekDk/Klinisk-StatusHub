import express from 'express';

import 'dotenv/config';
import path from 'node:path';
import router from './routes/api.js';
import { fileURLToPath } from 'node:url';

const app = express();
const port: string | number = process.env['PORT'] || 3000;

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

app.use('/api', router);

//serves static files from client/dist/client/browser
const publicPath: string = path.join(__dirname, '../../client/dist/client/browser');
app.use(express.static(publicPath));

// fallback route
app.get(/.*/, (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
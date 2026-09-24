import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectMongoDB from './db/connectMongoDB.js';

import dns from 'node:dns'; //!-

dns.setServers(['8.8.8.8', '8.8.4.4']); //!-

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.get('/test-error', (req, res, next) => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);

app.use(errorHandler);
('');

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server start in port${PORT}`);
});

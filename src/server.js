import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectMongoDB from './db/connectMongoDB.js';
import notesRouter from './routes/notesRouter.js';

import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']); //!-

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(notesRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server start in port${PORT}`);
});

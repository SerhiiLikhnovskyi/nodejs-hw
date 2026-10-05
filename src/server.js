import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectMongoDB from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';

import authRoutes from './routes/authRoutes.js';

import dns from 'node:dns';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);

app.use(notesRoutes);
app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server start in port ${PORT}`);
});

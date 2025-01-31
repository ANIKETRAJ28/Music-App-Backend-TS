import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './config/dotenv.config';
import { apiRouter } from './router';
import { ErrorResponse } from './util/ApiResponse.util';
import { redisClient } from './config/db.config';
import { initSocket } from './socket';
const app: Express = express();

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Alive...');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  new ErrorResponse(res, err);
});

const server = app.listen(PORT, async () => {
  try {
    redisClient.on('error', (err) => console.log('redis client error...', err));
    await redisClient.connect();
    await redisClient.set('health', 'fine');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

initSocket(server);

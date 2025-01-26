import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './config/dotenv.config';
import { apiRouter } from './router';
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

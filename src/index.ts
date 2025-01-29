import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './config/dotenv.config';
import { apiRouter } from './router';
import { ErrorResponse } from './util/ApiResponse.util';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import youtubesearchapi from 'youtube-search-api';
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

// app.get('/', (_: Request, res: Response) => {
//   res.send('Alive...');
// });

app.get('/', async (req: Request, res: Response) => {
  const extractedId = 'Hysrm6MdfCo';
  const videoDetails = await youtubesearchapi.GetVideoDetails(extractedId);
  console.log(videoDetails.thumbnail);
  console.log('video...', videoDetails);
  res.send('Alive...');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  new ErrorResponse(res, err);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

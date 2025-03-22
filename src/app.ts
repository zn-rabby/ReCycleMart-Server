import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://secondhand-client.vercel.app'],
    credentials: true,
  }),
);

// const test = async (req, res) => {
//   Promise.reject()
// }

app.use('/api/v1', router);
// application routes

app.get('', (req: Request, res: Response) => {
  res.send('Server is running...');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

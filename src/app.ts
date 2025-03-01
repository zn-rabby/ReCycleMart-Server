import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ListingRoutes } from './app/modules/listings/Listing.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// const test = async (req, res) => {
//   Promise.reject()
// }

app.use('/api', ListingRoutes);

// application routes

app.get('', (req: Request, res: Response) => {
  res.send('Server is running...');
});

export default app;

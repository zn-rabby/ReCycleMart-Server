import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// parser
app.use(express.json());
app.use(cors());

// const test = async (req, res) => {
//   Promise.reject()
// }

// app.get("/", test)

// application routes

app.get('', (req: Request, res: Response) => {
  res.send('Server is running...');
});

export default app;

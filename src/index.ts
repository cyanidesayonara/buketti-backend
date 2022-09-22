import { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';

config();

const index: Application = express();

index.get('/', (_req: Request, res: Response) => {
  res.send('Express server at your service');
});

const PORT = process.env.PORT || 3000;

index.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

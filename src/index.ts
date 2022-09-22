import { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';

config();

const app: Application = express();

app.use(express.static(__dirname + '/'));

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

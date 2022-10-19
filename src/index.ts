import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './../swagger.json';
import config from './utils/config';
import usersRouter from './controllers/users';
import editorContentsRouter from './controllers/editorContents';
import editHistoriesRouter from './controllers/editHistories';
import moment from './controllers/moment';

const app: Application = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use('/api/users', usersRouter);
app.use('/api/editorContents', editorContentsRouter);
app.use('/api/editHistories', editHistoriesRouter);
app.use('/api/moment', moment);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(config.PORT, () => {
  console.log(`Server is listening to port ${config.PORT}`);
});


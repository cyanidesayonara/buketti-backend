import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import config from './utils/config';
import usersRouter from './controllers/users';
import editorContentsRouter from './controllers/editorContents';
import editHistoriesRouter from './controllers/editHistories';
import moment from './controllers/moment';
import laskelmaRouter from './controllers/laskelmas';

const app: Application = express();

const swaggerOptions = {
  info: {
    version: '1.0.0',
    title: 'Buketti 2 backend',
    description: 'Buketti 2 backend REST API'
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.ts',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v1/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI swaggerOptions.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

expressJSDocSwagger(app)(swaggerOptions);

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/editorContents', editorContentsRouter);
app.use('/api/v1/editHistories', editHistoriesRouter);
app.use('/api/v1/moment', moment);
app.use('/api/v1/laskelmas', laskelmaRouter);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(config.PORT, () => {
  console.log(`Server is listening to port ${config.PORT}`);
});


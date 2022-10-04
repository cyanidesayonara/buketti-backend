import { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import XLSX from 'xlsx';

/* eslint-disable @typescript-eslint/no-var-requires */
const officeParser = require('officeparser');

const uploadDirectory = 'uploads/';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.existsSync(uploadDirectory) || fs.mkdirSync(uploadDirectory);
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filenameArray = file.originalname.split('.');
    const extension = filenameArray[filenameArray.length - 1];
    cb(null, uniqueSuffix + '.' + extension);
  }
})

const upload = multer({storage: storage})

config();

const app: Application = express();

app.use(express.static(__dirname + '/'));

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/docx/upload', upload.single('docx'), (req: Request, res: Response) => {
  if (req.file) {
    return officeParser.parseOffice(req.file.path, (data: string) => {
      res.send(data);
    })
  }
  return res.send('Upload failed');
});

app.post('/xlsx/upload', upload.single('xlsx'), (req: Request, res: Response) => {
  if (req.file) {
    const workbook = XLSX.readFile(req.file.path);
    const firstSheetName = workbook.SheetNames[0];
    const tableOutput = XLSX.utils.sheet_to_html(workbook.Sheets[firstSheetName]);

    return res.send(tableOutput);
  }
  return res.send('Upload failed');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

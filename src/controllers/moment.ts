import {Router, Request, Response} from 'express';
import internal from 'stream';
import { moveMessagePortToContext } from "worker_threads";

const moment = Router();

type Moment = {
  id: Number,
  financialCategory: Number,
  name: String
}

// Mock data
const testMoment:Moment = {
  id: 1,
  financialCategory: 40,
  name: "Maatalouden aloittamis- ja investointi"
};

moment.get('/:id', (req: Request, res: Response) => {
  //TODO: Return the moment with given ID from the DB  
  const { id } = req.params;
  const momentData = testMoment;
  momentData.id = Number(id);
  res.json(testMoment);
});

export default moment;

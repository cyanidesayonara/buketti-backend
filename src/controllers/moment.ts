import { Router, Request, Response } from 'express';

const moment = Router();

type Moment = {
  id: number,
  financialCategory: number,
  name: string
}

// Mock data
const testMoment: Moment = {
  id: 1,
  financialCategory: 40,
  name: 'Maatalouden aloittamis- ja investointi'
};

moment.get('/:id', (req: Request, res: Response) => {
  // TODO: Return the moment with given ID from the DB
  const { id } = req.params;
  testMoment.id = Number(id);
  res.json(testMoment);
});

export default moment;

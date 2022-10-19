import express, { Request, Response } from 'express';
import { getAll, getOne, deleteOne } from '../services/editHistories';

const editHistoriesRouter = express.Router();

editHistoriesRouter.get('/', async (req: Request, res: Response) => {
  const editHistories = await getAll();
  return res.json({ message: '', data: editHistories });
});

editHistoriesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editHistory = await getOne(Number(id));
  return res.json({ message: '', data: editHistory });
});

editHistoriesRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editHistory = await deleteOne(Number(id));
  return res.json({ message: '', data: editHistory });
});

export default editHistoriesRouter;

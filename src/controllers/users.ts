import express, { Request, Response } from 'express';
import { getAll, getOne, upsertOne, updateOne, deleteOne } from '../services/users';

const usersRouter = express.Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  const users = await getAll();
  return res.json({ message: '', data: users });
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getOne(Number(id));
  return res.json({ message: '', data: user });
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await upsertOne(name, email);
  return res.json({ message: '', data: user });
});

usersRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await updateOne(Number(id), name, email);
  return res.json({ message: '', data: user });
});

usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await deleteOne(Number(id));
  return res.json({ message: '', data: user });
});

export default usersRouter;

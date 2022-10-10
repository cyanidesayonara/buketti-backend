import express, { Request, Response } from 'express';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../services/editorContents';

const editorContentsRouter = express.Router();

editorContentsRouter.get('/', async (req: Request, res: Response) => {
  const editorContents = await getAll();
  return res.json({ message: '', data: editorContents });
});

editorContentsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editorContent = await getOne(Number(id));
  return res.json({ message: '', data: editorContent });
});

editorContentsRouter.post('/', async (req: Request, res: Response) => {
  const { content } = req.body;
  const editorContent = await createOne(content);
  return res.json({ message: '', data: editorContent });
});

editorContentsRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const editorContent = await updateOne(Number(id), content);
  return res.json({ message: '', data: editorContent });
});

editorContentsRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editorContent = await deleteOne(Number(id));
  return res.json({ message: '', data: editorContent });
});

export default editorContentsRouter;

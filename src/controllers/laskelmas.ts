import { Router, Request, Response } from 'express';
import { getAll, createOne, updateOne } from '../services/laskelmas';

const laskelmaRouter = Router();

laskelmaRouter.get('/', async (req: Request, res: Response) => {
  try {
    const laskelmat = await getAll();
    return res.json({ message: 'Laskelmas fetched', data: laskelmat });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return res.status(500).json({ error: message, data: null });
  }
});


laskelmaRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { tyyppi, muutosId, kanta, vuosi, kehysjako, arvo } = req.body;
    const laskelma = await createOne(tyyppi, muutosId, kanta, vuosi, kehysjako, arvo);
    return res.json({ message: 'Laskelma created', data: laskelma });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return res.status(500).json({ error: message, data: null });
  }
});

laskelmaRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tyyppi, muutosId, kanta, vuosi, kehysjako, arvo } = req.body;
    const laskelma = await updateOne(Number(id), tyyppi, muutosId, kanta, vuosi, kehysjako, arvo);
    return res.json({ message: 'Laskelma updated', data: laskelma });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return res.status(500).json({ error: message, data: null });
  }

});
export default laskelmaRouter;

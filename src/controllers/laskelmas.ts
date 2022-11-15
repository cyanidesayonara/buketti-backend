import { Router, Request, Response } from 'express';
import { getAll, createOne, updateOne } from '../services/laskelmas';

const laskelmaRouter = Router();

/**
 * Laskelma object
 * @typedef {object} Laskelma
 * @property {number} id
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} tyyppi
 * @property {number} muutosId
 * @property {string} kanta
 * @property {string} vuosi
 * @property {string} kehysjako
 * @property {number} arvo
 */

/**
 * New or updated laskelma object
 * @typedef {object} NewOrUpdatedLaskelma
 * @property {string} tyyppi
 * @property {number} muutosId
 * @property {string} kanta
 * @property {string} vuosi
 * @property {string} kehysjako
 * @property {number} arvo
 */

/**
 * Response for a single laskelma
 * @typedef {object} LaskelmaResponse
 * @property {string} message - success/error message
 * @property {Laskelma} data - laskelma
 */

/**
 * Response for multiple laskelmas
 * @typedef {object} LaskelmasResponse
 * @property {string} message - success/error message
 * @property {array<Laskelma>} data - laskelmas
 */

/**
 * GET /api/v1/laskelmas
 * @summary Get all laskelmas
 * @tags Laskelmas - REST API for laskelmas
 * @return {LaskelmasResponse} 200 - OK - application/json
 * @return {LaskelmasResponse} 500 - Error - application/json
 */
laskelmaRouter.get('/', async (req: Request, res: Response) => {
  try {
    const laskelmat = await getAll();
    return res.json({ message: 'Laskelmas fetched', data: laskelmat });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return res.status(500).json({ message: message, data: null });
  }
});

/**
 * POST /api/v1/laskelmas
 * @summary Create a new laskelma
 * @tags Laskelmas - REST API for laskelmas
 * @param {NewOrUpdatedLaskelma} request.body.required - Laskelma data
 * @return {LaskelmaResponse} 200 - OK - application/json
 * @return {LaskelmaResponse} 500 - Error - application/json
 */
laskelmaRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { tyyppi, muutosId, kanta, vuosi, kehysjako, arvo } = req.body;
    const laskelma = await createOne(tyyppi, muutosId, kanta, vuosi, kehysjako, arvo);
    return res.json({ message: 'Laskelma created', data: laskelma });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return res.status(500).json({ message: message, data: null });
  }
});

/**
 * PUT /api/v1/laskelmas/{id}
 * @summary Update an existing laskelma by id
 * @tags Laskelmas - REST API for laskelmas
 * @param {string} id.path.required - Laskelma id
 * @param {NewOrUpdatedLaskelma} request.body.required - Laskelma data
 * @return {LaskelmaResponse} 200 - OK - application/json
 * @return {LaskelmaResponse} 500 - Error - application/json
 */
laskelmaRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tyyppi, muutosId, kanta, vuosi, kehysjako, arvo } = req.body;
    const laskelma = await updateOne(Number(id), tyyppi, muutosId, kanta, vuosi, kehysjako, arvo);
    return res.json({ message: 'Laskelma updated', data: laskelma });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return res.status(500).json({ message: message, data: null });
  }

});
export default laskelmaRouter;

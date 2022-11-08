import express, { Request, Response } from 'express';
import { getAll, getOne, deleteOne } from '../services/editHistories';

const editHistoriesRouter = express.Router();

/**
 * Edit history object
 * @typedef {object} EditHistory
 * @property {number} id
 * @property {string} createdAt
 * @property {number} contentId
 * @property {number} userId
 */

/**
 * Response for a single edit history
 * @typedef {object} EditHistoryResponse
 * @property {string} message - success/error message
 * @property {EditHistory} data - edit history
 */

/**
 * Response for multiple edit histories
 * @typedef {object} EditHistoriesResponse
 * @property {string} message - success/error message
 * @property {array<EditHistory>} data - edit histories
 */

/**
 * GET /api/v1/editHistories
 * @summary Get all edit histories
 * @tags EditHistories - REST API for edit histories
 * @return {EditHistoriesResponse} 200 - OK - application/json
 */
editHistoriesRouter.get('/', async (req: Request, res: Response) => {
  const editHistories = await getAll();
  return res.json({ message: 'Edit histories fetched', data: editHistories });
});

/**
 * GET /api/v1/editHistories/{id}
 * @summary Get edit history by id
 * @tags EditHistories - REST API for edit histories
 * @param {string} id.path.required - EditHistory id
 * @return {EditHistoryResponse} 200 - OK - application/json
 */
editHistoriesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editHistory = await getOne(Number(id));
  return res.json({ message: 'Edit history fetched', data: editHistory });
});

/**
 * DELETE /api/v1/editHistories/{id}
 * @summary Delete an existing edit history by id
 * @tags EditHistories - REST API for edit histories
 * @param {string} id.path.required - EditHistory id
 * @return {EditHistoryResponse} 200 - OK - application/json
 */
editHistoriesRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editHistory = await deleteOne(Number(id));
  return res.json({ message: 'Edit history deleted', data: editHistory });
});

export default editHistoriesRouter;

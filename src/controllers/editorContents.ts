import express, { Request, Response } from 'express';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../services/editorContents';

const editorContentsRouter = express.Router();

/**
 * Editor content object
 * @typedef {object} EditorContent
 * @property {number} id
 * @property {string} createdAt
 * @property {string} content
 * @property {User} user
 */

/**
 * New or updated editor content object
 * @typedef {object} NewOrUpdatedEditorContent
 * @property {string} content
 */

/**
 * User object
 * @typedef {object} User
 * @property {number} id
 * @property {string} createdAt
 * @property {string} name
 * @property {string} email
 */

/**
 * Response for a single editor content
 * @typedef {object} EditorContentResponse
 * @property {string} message - success/error message
 * @property {EditorContent} data - editor content
 */

/**
 * Response for multiple editor contents
 * @typedef {object} EditorContentsResponse
 * @property {string} message - success/error message
 * @property {array<EditorContent>} data - editor contents
 */

/**
 * GET /api/v1/editorContents
 * @summary Get all editor contents
 * @tags EditorContents - REST API for editor contents
 * @return {EditorContentsResponse} 200 - OK - application/json
 */
editorContentsRouter.get('/', async (req: Request, res: Response) => {
  const editorContents = await getAll();
  return res.json({ message: 'Editor contents fetched', data: editorContents });
});

/**
 * GET /api/v1/editorContents/{id}
 * @summary Get editor content by id
 * @tags EditorContents - REST API for editor contents
 * @param {string} id.path.required - EditorContent id
 * @return {EditorContentResponse} 200 - OK - application/json
 */
editorContentsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editorContent = await getOne(Number(id));
  return res.json({ message: 'Editor content fetched', data: editorContent });
});

/**
 * POST /api/v1/editorContents
 * @summary Create a new editor content
 * @tags EditorContents - REST API for editor contents
 * @param {NewOrUpdatedEditorContent} request.body.required - EditorContent data
 * @return {EditorContentResponse} 200 - OK - application/json
 */
editorContentsRouter.post('/', async (req: Request, res: Response) => {
  const { content } = req.body;
  const editorContent = await createOne(content);
  return res.json({ message: '', data: editorContent });
});

/**
 * PUT /api/v1/editorContents/{id}
 * @summary Update an existing editor content by id
 * @tags EditorContents - REST API for editor contents
 * @param {string} id.path.required - EditorContent id
 * @param {NewOrUpdatedEditorContent} request.body.required - EditorContent data
 * @return {EditorContentResponse} 200 - OK - application/json
 */
editorContentsRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const editorContent = await updateOne(Number(id), content);
  return res.json({ message: 'Editor content updated', data: editorContent });
});

/**
 * DELETE /api/v1/editorContents/{id}
 * @summary Delete an existing editor content by id
 * @tags EditorContents - REST API for editor contents
 * @param {string} id.path.required - EditorContent id
 * @return {EditorContentResponse} 200 - OK - application/json
 */
editorContentsRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const editorContent = await deleteOne(Number(id));
  return res.json({ message: 'Editor content deleted', data: editorContent });
});

export default editorContentsRouter;

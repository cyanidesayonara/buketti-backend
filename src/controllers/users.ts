import express, { Request, Response } from 'express';
import { getAll, getOne, upsertOne, updateOne, deleteOne } from '../services/users';

const usersRouter = express.Router();

/**
 * User object
 * @typedef {object} User
 * @property {number} id
 * @property {string} createdAt
 * @property {string} name
 * @property {string} email
 */

/**
 * New or updated user object
 * @typedef {object} NewOrUpdatedUser
 * @property {string} name
 * @property {string} email
 */

/**
 * Editor content object
 * @typedef {object} EditorContent
 * @property {number} id
 * @property {string} createdAt
 * @property {string} content
 */

/**
 * Response for a single user
 * @typedef {object} UserResponse
 * @property {string} message - success/error message
 * @property {User} data - user
 */

/**
 * Response for multiple users
 * @typedef {object} UsersResponse
 * @property {string} message - success/error message
 * @property {array<User>} data - users
 */

/**
 * GET /api/v1/users
 * @summary Get all users
 * @tags Users - REST API for users
 * @return {UsersResponse} 200 - OK - application/json
 */
usersRouter.get('/', async (req: Request, res: Response) => {
  const users = await getAll();
  return res.json({ message: 'Users fetched', data: users });
});

/**
 * GET /api/v1/users/{id}
 * @summary Get user by id
 * @tags Users - REST API for users
 * @param {string} id.path.required - User id
 * @return {UserResponse} 200 - OK - application/json
 */
usersRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getOne(Number(id));
  return res.json({ message: 'User fetched', data: user });
});

/**
 * POST /api/v1/users
 * @summary Create a new user
 * @tags Users - REST API for users
 * @param {NewOrUpdatedUser} request.body.required - User data
 * @return {UserResponse} 200 - OK - application/json
 */
usersRouter.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await upsertOne(name, email);
  return res.json({ message: 'User created', data: user });
});

/**
 * PUT /api/v1/users/{id}
 * @summary Update an existing user by id
 * @tags Users - REST API for users
 * @param {string} id.path.required - User id
 * @param {NewOrUpdatedUser} request.body.required - User data
 * @return {UserResponse} 200 - OK - application/json
 */
usersRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await updateOne(Number(id), name, email);
  return res.json({ message: 'User updated', data: user });
});

/**
 * DELETE /api/v1/users/{id}
 * @summary Delete an existing user by id
 * @tags Users - REST API for users
 * @param {string} id.path.required - User id
 * @return {UserResponse} 200 - OK - application/json
 */
usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await deleteOne(Number(id));
  return res.json({ message: 'User deleted', data: user });
});

export default usersRouter;

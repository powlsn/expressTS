import { Router } from 'express';
import {
  getUsers,
  getUserCreate,
  postUserCreate,
  getUserUpdate,
  patchUserUpdate,
  getUserDetail,
  deleteUser,
} from '../controller/userController';

export const userRouter = Router();

userRouter.get('/', getUsers);
// userRouter.get('/users', (req, res, next) => getUsers(req, res, next));

userRouter.get('/add', getUserCreate);

userRouter.get('/:id', getUserDetail);

userRouter.post('/', postUserCreate);

userRouter.get('/:id/edit', getUserUpdate);

userRouter.patch('/:id/edit', patchUserUpdate);

userRouter.delete('/:id/delete', deleteUser);

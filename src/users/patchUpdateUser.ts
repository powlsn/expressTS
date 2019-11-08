import { RequestHandler } from 'express';
import { User } from '../../models/User';
import { getAllUsers } from './getAllUsers';

export const patchUpdateUser: RequestHandler = async (req, res, next) => {
  const requestUser = req.body;

  const user = await User.query()
    .findById(req.params.id)
    .patch(requestUser);

  console.log(user);

  getAllUsers(req, res, next);
};

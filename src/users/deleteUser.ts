import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const deleteUser: RequestHandler = async (req, res, next) => {
  const userID = req.params.id;
  const user = await User.query()
    .findById(userID)
    .delete();
  console.log('User deleted', user);
  return res.status(200).redirect('/users');
};

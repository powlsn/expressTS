import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const users = await User.query();
  // console.log(users);
  return res.render('user-list', {
    title: 'Users List',
    users: users,
    message: 'List of Users',
  });
};

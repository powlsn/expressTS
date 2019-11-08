import { RequestHandler } from 'express-serve-static-core';
import { User } from '../../models/User';

export const getUpdateUser: RequestHandler = async (req, res) => {
  const user = await User.query().findById(req.params.id);
  let message;
  if (!user) {
    message = 'User not found!';
  }
  res.render('user-edit', {
    title: 'Edit User',
    message: message || '',
    user: user || {},
  });
};

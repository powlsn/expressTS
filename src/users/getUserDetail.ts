import { RequestHandler } from 'express-serve-static-core';
import { User } from '../../models/User';

export const getUserDetail: RequestHandler = async (req, res) => {
  const user = await User.query().findById(req.params.id);
  let message = '';
  if (!user) {
    message = 'User not found';
  }

  return res.render('user-detail', {
    title: 'User Details',
    user: user,
    message: message,
  });
};

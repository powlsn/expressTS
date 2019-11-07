import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const patchUser: RequestHandler = async (req, res) => {
  const user = await User.query().findById(req.params.id);
  let message = '';

  if (!user) {
    message = 'User not found';
  }

  res.render('user-edit', {
    title: 'User Edit',
    user: user,
    message: message || '',
  });
};

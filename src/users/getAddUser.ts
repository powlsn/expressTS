import { RequestHandler } from 'express';

export const getAddUser: RequestHandler = (req, res) => {
  return res.render('user-add', {
    title: 'Add User',
  });
};

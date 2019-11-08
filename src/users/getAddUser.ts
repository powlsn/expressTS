import { RequestHandler } from 'express';

export const getAddUser: RequestHandler = (req, res) => {
  res.render('user-add', {
    title: 'Add User',
  });
};

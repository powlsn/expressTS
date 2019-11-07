import { RequestHandler } from 'express';

export const getAddUser: RequestHandler = (req, res, next) => {
  res.render('user-add', {
    title: 'Add User',
  });
};

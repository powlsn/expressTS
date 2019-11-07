import { RequestHandler } from 'express';

export const getHome: RequestHandler = (req, res, next) => {
  res.render('home', {
    title: 'User Board!',
    message: 'Welcome here ...',
  });
};

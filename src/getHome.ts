import { RequestHandler } from 'express';

export const getHome: RequestHandler = (req, res) => {
  res.render('home', {
    title: 'User Board!',
    message: 'Welcome here ...',
  });
};

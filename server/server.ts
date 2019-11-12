const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[environment];
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require('knex')(config);
import { Model } from 'objection';
import path from 'path';
import express from 'express';
import methodOverride from 'method-override';
import { urlencoded } from 'body-parser';
import { userRouter } from './router/userRouter';

Model.knex(knex);
const server = express();

// server.disable('x-powered-by'); // hide Header entry for Express (Security Feature)
server.use(urlencoded({ extended: true }));
server.use(methodOverride('_method'));
server.use('/static', express.static(path.resolve('./', 'public')));
server.get('/', (req, res) => {
  res.render('home', {
    title: 'User Board!',
    message: 'Welcome here ...',
  });
});
server.use('/users', userRouter);
server.set('view engine', 'pug');
server.set('views', ['./views/', './views/users/']);
server.listen(3000, () => {
  console.log('Server started...');
});
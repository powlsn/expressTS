import path from 'path';
import express from 'express';
import methodOverride from 'method-override';
import { urlencoded } from 'body-parser';
import { userRouter } from './router/userRouter';
import { knex } from './storage/knex';

knex; // establish database connection and bind models to

const server = express();

// server.disable('x-powered-by'); // hide the express entry header
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

import express from 'express';
import { urlencoded } from 'body-parser';
import { userRouter } from './src/userRouter';
import { knex } from './db/knex';
import methodOverride from 'method-override';

knex; // establish database connection and bind models to

const app = express();

app.disable('x-powered-by');
app.use(urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/', userRouter);
app.set('view engine', 'pug');
app.set('views', ['./src/views/templates/']);
app.listen(3000, () => {
  console.log('Server started...');
});

import express from 'express';
import { json, raw, text, urlencoded } from 'body-parser';
import { v1 } from './src/app';

const app = express();

app.disable('x-powered-by');
app.use(urlencoded({ extended: true }));
app.use('/', v1);
app.set('view engine', 'pug');
app.set('views', ['./src/views/templates/']);
app.listen(3000, () => {
  console.log('Server started...');
});

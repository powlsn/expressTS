import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.render('home', {
    title: 'Hey',
    message: 'App List Users',
  });
});

app.set('view engine', 'pug');
app.set('views', ['./views/templates/']);

app.use('/static', express.static('public'));

app.listen(3000, () => {
  console.log('Server started...');
});

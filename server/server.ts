const environment = process.env.NODE_ENV || 'development';
const envpath = environment === 'test' ? './env/test.env' : './env/development.env'
// console.log("TCL: envpath", envpath)
require('dotenv').config({ path: envpath });
// console.log("TCL: environment", environment)
const config = require('./knexfile.js')[environment];
// console.log("TCL: config", config)
// console.log("TCL: config", config)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require('knex')(config);
import { Model } from 'objection';
import path from 'path';
import express from 'express';
import methodOverride from 'method-override';
import { urlencoded } from 'body-parser';
import { userRouter } from './router/userRouter';
import { connectionOptions } from './utils/connectionOptions';
import { User } from './src/entity/User';
import { Repository, createConnection } from 'typeorm';

Model.knex(knex);
const PORT = process.env.PORT || 3000;
// export let repository: Repository<User>;

connectionOptions().then(options => {
  createConnection({...options, name: "default"}).then(connection => {
    // const init = () => {
    //   // const connection = getConnection();
    //   repository = connection.getRepository(User)
    // }
    // init();
    
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
    server.listen(PORT, () => {
      console.log('Server started on PORT:', PORT);
    });
  }).catch(err => {
    console.log(err);
  });
});
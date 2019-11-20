import path from 'path';
import express from 'express';
import methodOverride from 'method-override';
import { urlencoded } from 'body-parser';
import { getConnection, ConnectionOptions, createConnection, Connection } from 'typeorm';
import { userRouter } from './router/userRouter';
import { UserController } from './controller/UserController';

const options = require("./ormconfig.js");

const env = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;
const ormOptions: ConnectionOptions = env !== 'test' ? options[0] : options[1];
const dbConnection: Promise<Connection> = createConnection(ormOptions);
const PORT = 3000;

export const server: express.Application = express(); 

dbConnection
  .then(connection => {
    // setup typeORM
    server.use(methodOverride('_method'));
    const connectionName = connection.name;
    connection.runMigrations();
    // const userRepository = getConnection(connectionName).getRepository(User);
    const entityManager = getConnection(connectionName).manager;
    const controller = new UserController(entityManager);
    
    server.set('ctrl', controller);

    // server.disable('x-powered-by'); // hide Header entry for Express (Security Feature)
    server.use(urlencoded({ extended: true }));
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
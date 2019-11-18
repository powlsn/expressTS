import path from 'path';
import express from 'express';
import { Application } from 'express';
import methodOverride from 'method-override';
import { urlencoded } from 'body-parser';
import { getConnection } from 'typeorm';
import { dbConnection } from './utils/connectionOptions';
import { userRouter } from './router/userRouter';
import { User } from './entity/User';
import { UserController } from './controller/UserController';

const PORT = 3000;
export const server: Application = express(); 

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
    server.use('/users', userRouter);
    server.set('view engine', 'pug');
    server.set('views', ['./views/', './views/users/']);
    server.listen(PORT, () => {
      console.log('Server started on PORT:', PORT);
    });
  }).catch(err => {
    console.log(err);
});
import * as path from 'path';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { urlencoded } from 'body-parser';
import {
  getConnection,
  ConnectionOptions,
  createConnection,
  Connection,
} from 'typeorm';
import { userRouter } from './router/userRouter';
import { photoRouter } from './router/photoRouter';
import { UserController } from './controller/UserController';
import { PhotoController } from './controller/photoController';
import { AppService } from './app-service';

const options = require('./ormconfig.js');

const env = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;
const ormOptions: ConnectionOptions = env !== 'test' ? options[0] : options[1];
const dbConnection: Promise<Connection> = createConnection(ormOptions);
const PORT = 3000;

export const server: express.Application = express();

dbConnection
  .then(connection => {
    // setup typeORM
    const connectionName = connection.name;
    const entityManager = getConnection(connectionName).manager;
    const appService = new AppService(entityManager);
    const userController = new UserController(appService);
    const photoController = new PhotoController(entityManager);

    server.use(methodOverride('_method'));
    server.set('user_ctrl', userController);
    server.set('photo_ctrl', photoController);
    server.use(urlencoded({ extended: true }));
    server.use('/static', express.static(path.resolve('./', 'public')));
    server.get('/', (req, res) => {
      res.render('home', {
        title: 'User Board!',
        message: 'Welcome here ...',
      });
    });
    server.use('/users', userRouter);
    server.use('/photos', photoRouter);
    server.set('view engine', 'pug');
    server.set('views', ['./views/', './views/users/', './views/photos/']);
    server.listen(PORT, () => {
      console.log('Server started on PORT:', PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });

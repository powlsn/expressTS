import { Router } from 'express';
import { server } from '../server';
export const userRouter = Router();

// const controller = server.get('controller');

userRouter.get('/', (request, response) => {
  server.get('ctrl').getUsers(request, response);
});

userRouter.get('/add', (request, response) => {
  server.get('ctrl').getCreateUser(request, response);
});

userRouter.get('/:id', (request, response) => {
  server.get('ctrl').getUserById(request, response);
});

userRouter.post('/', (request, response) => {
  server.get('ctrl').createUser(request, response);
});

userRouter.get('/:id/edit', (request, response) => {
  server.get('ctrl').getUserUpdate(request, response);
});

userRouter.patch('/:id/edit', (request, response) => {
  server.get('ctrl').updateUser(request, response);
});

userRouter.delete('/:id/delete', (request, response) => {
  server.get('ctrl').deleteUser(request, response);
});

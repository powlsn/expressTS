import { Router } from 'express';
import { server } from '../server';
export const userRouter = Router();

// const controller = server.get('controller');

userRouter.get('/', (request, response) => {
  server.get('user_ctrl').getUsers(request, response);
});

userRouter.get('/add', (request, response) => {
  server.get('user_ctrl').getUserCreate(request, response);
});

userRouter.get('/:id', (request, response) => {
  server.get('user_ctrl').getUserById(request, response);
});

userRouter.post('/', (request, response) => {
  server.get('user_ctrl').postUserCreate(request, response);
});

userRouter.get('/:id/edit', (request, response) => {
  server.get('user_ctrl').getUserUpdate(request, response);
});

userRouter.patch('/:id/edit', (request, response) => {
  server.get('user_ctrl').patchUserUpdate(request, response);
});

userRouter.delete('/:id/delete', (request, response) => {
  server.get('user_ctrl').deleteUser(request, response);
});

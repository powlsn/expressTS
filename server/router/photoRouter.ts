import { Router } from 'express';
import { server } from '../server';

export const photoRouter = Router();

photoRouter.get('/delete/:id', (request, response) => {
  server.get('photo_ctrl').getDeletePhoto(request, response);
});

photoRouter.delete('/delete/:id', (request, response) => {
  server.get('photo_ctrl').deletePhoto(request, response);
});

photoRouter.get('/:id/edit', (request, response) => {
  server.get('photo_ctrl').getEditPhoto(request, response);
});

photoRouter.patch('/:id/edit', (request, response) => {
  server.get('photo_ctrl').patchEditPhoto(request, response);
});

import { Router } from 'express';
import { server } from '../server';

export const photoRouter = Router();

photoRouter.get('/:id/edit', (request, response) => {
  server.get('photo_ctrl').getEditPhoto(request, response);
});

photoRouter.patch('/:id/edit', (request, response) => {
  server.get('photo_ctrl').patchEditPhoto(request, response);
});

// photoRouter.delete('/:id/delete', (request, response) => {
//   server.get('photo_ctrl').deletePhoto(request, response);
// });

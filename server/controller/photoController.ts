import { Request, Response } from 'express';
import { Connection } from 'typeorm';
import { PhotoService } from '../photo-service';

export class PhotoController {
  constructor(readonly connection: Connection) {}

  private photoService: PhotoService = new PhotoService(this.connection);

  public async getDeletePhoto(request: Request, response: Response): Promise<void> {
    const photo = await this.photoService.getById(parseInt(request.params.id));
    response.status(200).render('photo-delete', {
      title: 'Delete Photo',
      photo: photo,
    });
  }

  public async deletePhoto(request: Request, response: Response): Promise<void> {
    const photoid = parseInt(request.params.id);
    const deleted = await this.photoService.deleteById(photoid);

    if (deleted.affected !== 1) {
      response.status(400).redirect(400, '/users');
    }
    response.status(203).redirect(301, `/users/${request.body.userid}`);
  }
}

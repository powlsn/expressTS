import { Request, Response } from 'express';
import { Connection } from 'typeorm';
import { PhotoService } from '../photo-service';

export class PhotoController {
  constructor(readonly connection: Connection) {}

  private service: PhotoService = new PhotoService(this.connection);

  public async getDeletePhoto(request: Request, response: Response): Promise<void> {
    // TODO fix this
    const photo = await this.service.getPhotoById(parseInt(request.params.id));
    // console.log("TCL: PhotoController -> constructor -> photo", photo)
    response.status(200).render('photo-delete', {
      title: 'Delete Photo',
      photo: photo,
    });
  }

  public async deletePhoto(request: Request, response: Response): Promise<void> {
    const photoid = parseInt(request.params.id);
    console.log('TCL: PhotoController -> constructor -> photoid', photoid);
    const deleted = await this.service.deletePhoto(photoid);

    // TODO: it needs a better error handling :-/
    if (deleted.affected !== 1) {
      response.status(400).redirect(400, '/users');
    }
    response.status(203).redirect(301, `/users/${request.body.userid}`);
  }
}

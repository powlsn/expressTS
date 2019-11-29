import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Photo } from '../entity/Photo.entity';
import { PhotoService } from '../photo-service';

export class PhotoController {
  constructor(readonly service: PhotoService) {}

  public async getDeletePhoto(request: Request, response: Response): Promise<void> {
    // TODO fix this
    // const photo = await this.repo.findOne(request.params.id, { relations: ['user'] });
    // console.log("TCL: PhotoController -> constructor -> photo", photo)
    response.status(200).render('photo-delete', {
      title: 'Delete Photo',
      // photo: photo,
    });
  }

  public async deletePhoto(request: Request, response: Response): Promise<void> {
    const deleted = this.service.deletePhoto(parseInt(request.body.photoid));

    if (!deleted) {
      response.status(400).redirect(400, '/users');
    }
    // TODO response to user detail '/users/${user.id}'
    response.status(203).redirect(301, `/users/${id}`);
  }
}

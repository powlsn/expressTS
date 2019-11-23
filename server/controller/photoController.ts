import { Request, Response } from 'express';
import { EntityManager, getManager } from 'typeorm';
import { Photo } from '../entity/Photo.entity';

export class PhotoController {
  constructor(readonly manager: EntityManager) {}

  public async getDeletePhoto(request: Request, response: Response): Promise<void> {
    const photoRepo = this.manager.getRepository(Photo);
    const photo = await photoRepo.findOne(request.params.id);
    const user = await photo.user;
    response.status(200).render('photo-delete', {
      title: 'Delete Photo',
      user: user,
      photo: photo,
    });
  }

  public async deletePhoto(request: Request, response: Response): Promise<void> {
    const uid = request.body.userid;
    await this.manager.delete(Photo, request.params.id);
    response.status(203).redirect(301, `/users/${uid}`);
  }
}

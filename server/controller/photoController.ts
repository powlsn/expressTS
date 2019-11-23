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
    const deleted = await this.manager.delete(Photo, request.params.id);
    console.log('TCL: PhotoController -> constructor -> deleted', deleted); // just ensure what kind of data is inside
    response.status(203).redirect(301, '/users');
  }

  public async getEditPhoto(request: Request, response: Response): Promise<void> {
    const photoRepository = this.manager.getRepository(Photo);
    const photo = await photoRepository.findOne(request.params.id);
    const user = await photo.user;

    console.log('TCL: PhotoController', user);

    if (!photo) {
      response.redirect(400, '/users');
    }

    response.status(200).render('photo-edit', {
      title: 'Edit Photo',
      photo: photo,
      user: user,
    });
  }

  public async patchEditPhoto(request: Request, response: Response): Promise<void> {
    const photoRepository = this.manager.getRepository(Photo);
    let photo = await photoRepository.findOne(request.body.photoid);
    photo.imageUrl = request.body.imageUrl;
    photo = await photoRepository.save(photo);
    console.log('photo saved: ', photo);

    if (!photo) {
      response.status(400).redirect(`/users/${request.body.userid}`);
    }

    response.status(203).redirect(`/users/${request.body.userid}`);
  }
}

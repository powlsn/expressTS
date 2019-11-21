import { Request, Response } from 'express';
import { EntityManager, getManager } from 'typeorm';
import { Photo } from '../entity/Photo.entity';

export class PhotoController {
  constructor(readonly manager: EntityManager) {}

  public async getDeletePhoto(request: Request, response: Response): Promise<void> {
    const photoRepo = this.manager.getRepository(Photo);
    const photo = await photoRepo.findOne(request.params.id);
    response.status(200).render('photo-edit', {
      title: 'Delete Photo',
      photo: photo
    });
  }

  public async deletePhoto(request: Request, response: Response): Promise<void> {
    const deleted = await this.manager.delete(Photo, request.params.id);
    console.log("TCL: PhotoController -> constructor -> deleted", deleted) // just ensure what kind of data is inside
    response.status(203).redirect(301, '/users');
  }
  
  public async getEditPhoto(request: Request, response: Response): Promise<void> {
    const photoRepo = this.manager.getRepository(Photo);
    const photo = await photoRepo.findOne(request.params.id);
    // console.log("Mein Console log", photo.user); // undefined! wie komm ich an den user ran???
    if (!photo) {
      response.redirect(400, '/users');
    }

    response.status(200).render('photo-edit', {
      title: 'Edit Photo',
      photo: photo,
    });
  }

  public async patchEditPhoto(request: Request, response: Response): Promise<void> {
    console.log("photo edit TODO!");
  }
}
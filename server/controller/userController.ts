import { Request, Response } from 'express';
import { EntityManager, getManager } from 'typeorm';
import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { PhotoController } from './photoController';

export class UserController {
  constructor(readonly manager: EntityManager) {}

  public async getUsers(request: Request, response: Response): Promise<void> {
    const user = await this.manager.find(User);

    if(!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-list', {
      title: 'Users List',
      users: user,
    });
  }

  public async getUserById(request: Request, response: Response): Promise<void> {
    const user = await this.manager.findOne(User, request.params.id);
    
    if (!user) {
      response.redirect(400, 'user-detail');
    }

    response.status(200).render('user-detail', {
      title: 'User Details',
      user: user,
    });
  }

  public getUserCreate(request: Request, response: Response): void {
    response.status(200).render('user-add', {
      title: 'User Add',
    });
  }

  public async postUserCreate(request: Request, response: Response): Promise<void> {
    const user = new User();
    user.firstname = request.body.firstname;
    user.lastname = request.body.lastname;
    const photos = this.photosFromParams(request.body.photos);
    user.photos = photos;
    const erg = await this.manager.save(user);

    if (!erg) {
      response.redirect(400, '/users');
    }

    response.status(201).render('user-detail', {
      title: 'User Details',
      user: user,
    });
  }

  public async getUserUpdate(request: Request, response: Response): Promise<void> {
    const userRepo = this.manager.getRepository(User);
    const user = await userRepo.findOne(request.params.id);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-edit', {
      title: 'Edit User',
      user: user,
    });
  }

  public async patchUserUpdate(request: Request, response: Response): Promise<void> {
    // const images = this.photosFromParams(request);
    // // const photos = await this.manager.save(images);
    // const updatedUser = this.userFromParams(request);
    // // updatedUser.photos = Promise.resolve(images);
    // const user = await this.manager.save(updatedUser);

    // if (!user) {
    //   response.redirect(400, '/users');
    // }

    response.status(204).redirect(`/users/1`);
  }

  public async deleteUser(request: Request, response: Response): Promise<void> {
    const deleted = await this.manager.delete(User, request.params.id);
    console.log("TCL: UserController -> constructor -> deleted", deleted)

    response.status(203).redirect(301, '/users');
  }

  private photosFromParams(photos: string[]): Photo[] {
    return this.manager.create(
      Photo,
      photos
        .filter(e => e) // rejects empty strings
        .map(item =>  Object.assign(new Photo(), {
          imageUrl: item 
        })),
    );
  }
}

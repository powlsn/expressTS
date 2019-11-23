import { Request, Response } from 'express';
import { EntityManager, getManager } from 'typeorm';
import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { PhotoController } from './photoController';

export class UserController {
  constructor(readonly manager: EntityManager) {}

  public async getUsers(request: Request, response: Response): Promise<void> {
    const user = await this.manager.find(User);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-list', {
      title: 'Users List',
      users: user,
    });
  }

  public async getUserById(request: Request, response: Response): Promise<void> {
    const userRepo = this.manager.getRepository(User);
    const user = await userRepo.findOne(request.params.id);
    const photos = await user.photos;

    if (!user) {
      response.redirect(400, 'user-detail');
    }

    response.status(200).render('user-detail', {
      title: 'User Details',
      user: user,
      photos: photos,
    });
  }

  public getUserCreate(request: Request, response: Response): void {
    response.status(200).render('user-add', {
      title: 'User Add',
    });
  }

  public async postUserCreate(request: Request, response: Response): Promise<void> {
    const userRepository = this.manager.getRepository(User);
    const photoRepository = this.manager.getRepository(Photo);

    let user = new User();
    user.firstname = request.body.firstname;
    user.lastname = request.body.lastname;
    user = await userRepository.save(user);
    console.log('user has been saved.');

    let photos = this.photosFromParams(request.body.photos, user.id);
    photos = await photoRepository.save(photos);

    if (!user || !photos) {
      response.redirect(400, '/users');
    }

    response.status(201).render('user-detail', {
      title: 'User Details',
      user: user,
      photos: photos,
    });
  }

  public async getUserUpdate(request: Request, response: Response): Promise<void> {
    const userRepo = this.manager.getRepository(User);
    const user = await userRepo.findOne(request.params.id);
    const photos = await user.photos;

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-edit', {
      title: 'Edit User',
      user: user,
      photos: photos,
    });
  }

  public async patchUserUpdate(request: Request, response: Response): Promise<void> {
    const userRepository = this.manager.getRepository(User);
    const photoRepository = this.manager.getRepository(Photo);

    let user = await userRepository.findOne(request.body.id);
    user.firstname = request.body.firstname;
    user.lastname = request.body.lastname;
    user = await userRepository.save(user);

    let photos = await photoRepository.find({
      relations: ['user'],
      where: {
        user: request.body.id,
      },
    });

    await photoRepository.remove(photos);
    console.log('photos has been removed', photos);

    photos = this.photosFromParams(request.body.photos, user.id);
    await photoRepository.save(photos);

    if (!user || !photos) {
      response.redirect(400, '/users');
    }

    response.status(204).redirect(`/users/${user.id}`);
  }

  public async deleteUser(request: Request, response: Response): Promise<void> {
    const userRepository = this.manager.getRepository(User);
    const user = await userRepository.findOne(request.body.id);
    const deleted = await userRepository.remove(user); // this hit's maybe the database itegrety :-(
    // const deleted = await this.manager.delete(User, request.params.id);
    console.log('TCL: UserController -> constructor -> deleted', deleted);

    response.status(203).redirect(301, '/users');
  }

  private photosFromParams(photos: string[], userid: number): Photo[] {
    return this.manager.create(
      Photo,
      photos
        .filter(e => e) // rejects empty strings
        .map(item =>
          Object.assign(new Photo(), {
            imageUrl: item,
            user: userid,
          }),
        ),
    );
  }
}

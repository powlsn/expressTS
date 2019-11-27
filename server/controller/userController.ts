import { Request, Response } from 'express';
import { AppService } from '../app-service';
import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { userParser } from '../middleware/userParser';
import { photosArrayParser } from '../middleware/photoArrayParser';

export class UserController {
  constructor(readonly service: AppService) {}

  public async getUsers(request: Request, response: Response): Promise<void> {
    const user = await this.service.getAllUser();

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-list', {
      title: 'Users List',
      users: user,
    });
  }

  public async getUserById(request: Request, response: Response): Promise<void> {
    const user: User = await this.service.getUser(parseInt(request.params.id));

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
    const tempUser: User = userParser(request);
    const user: User = await this.service.createUser(tempUser);
    const tempPhotos: Photo[] = photosArrayParser(request.body.photo, user.id);
    await this.service.createPhotos(user, tempPhotos);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(201).render('user-detail', {
      title: 'User Details',
      user: user,
    });
  }

  public async getUserUpdate(request: Request, response: Response): Promise<void> {
    const user: User = await this.service.getUser(parseInt(request.params.id));

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-edit', {
      title: 'Edit User',
      user: user,
    });
  }

  public async patchUserUpdate(request: Request, response: Response): Promise<void> {
    // prepare the objects
    const user: User = userParser(request);
    const photo: Photo[] = photosArrayParser(request.body.photo, parseInt(request.params.id));

    // here starts the code its actual task
    const u: User = await this.service.updateUser(user, photo);

    if (!u) {
      response.redirect(400, '/users');
    }

    response.status(204).redirect(`/users/${u.id}`);
  }

  public async deleteUser(request: Request, response: Response): Promise<void> {
    const id = parseInt(request.params.id);
    await this.service.deleteUser(id);
    response.status(203).redirect(301, '/users');
  }
}

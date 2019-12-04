import { Connection } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { requestUserMapper } from '../middleware/requestUserMapper';
import { requestPhotoMapper } from '../middleware/requestPhotoMapper';
import { PhotoService } from '../photo-service';
import { UserService } from '../user-service';

export class UserController {
  constructor(readonly connection: Connection) {}
  private userService: UserService = new UserService(this.connection);
  private photoService: PhotoService = new PhotoService(this.connection);

  public async getUsers(request: Request, response: Response): Promise<void> {
    const user = await this.userService.getUser();

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-list', {
      title: 'Users List',
      users: user,
    });
  }

  public async getUserById(request: Request, response: Response): Promise<void> {
    const user: User = await this.userService.getById(parseInt(request.params.id), ['photos']);

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
    let user: User = requestUserMapper(request);
    user = await this.userService.save(user);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(201).render('user-detail', {
      title: 'User Details',
      user: user,
    });
  }

  public async getUserUpdate(request: Request, response: Response): Promise<void> {
    const user: User = await this.userService.getById(parseInt(request.params.id), ['photos']);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-edit', {
      title: 'Edit User',
      user: user,
    });
  }

  public async patchUserUpdate(request: Request, response: Response): Promise<void> {
    const paramsuser: User = requestUserMapper(request);
    const user: User = await this.userService.update(paramsuser);
    const photos: Photo[] = await this.photoService.getByUserId(user.id);

    await this.photoService.delete(photos);
    await this.userService.save(user);

    const paramsphotos: Photo[] = requestPhotoMapper(request.body.photo);
    paramsphotos.map(photo => (photo.user = user));
    await this.photoService.save(paramsphotos);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(204).redirect(`/users/${user.id}`);
  }

  public async deleteUser(request: Request, response: Response): Promise<void> {
    const id: number = parseInt(request.params.id);
    await this.userService.delete(id);
    response.status(203).redirect(301, '/users');
  }
}

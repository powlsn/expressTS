import { Request, Response } from 'express';
import { UserService } from '../user-service';
import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { requestUserMapper } from '../middleware/requestUserMapper';
import { photosArrayParser, photoArray } from '../middleware/photoArrayParser';

export class UserController {
  constructor(readonly service: UserService) {}

  public async getUsers(request: Request, response: Response): Promise<void> {
    const user = await this.service.getAllUsers();

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
    const tmpUser: User = requestUserMapper(request);
    let user: User = await this.service.createUser(tmpUser);
    // const test = photoArray(request.body.photo, user.id);
    // const tmpPhotos: Photo[] = photosArrayParser(request.body.photo, user.id);
    // await this.service.createPhotos(user, tmpPhotos);
    user = await this.service.getUser(user.id);

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
    const user: User = requestUserMapper(request);
    // const photo: Photo[] = photosArrayParser(request.body.photo, parseInt(request.params.id));
    photoArray(request.body.photo, parseInt(request.params.id));
    // console.log("TCL: UserController -> constructor -> photo", photo)


    // here starts the code its actual task
    const u: User = await this.service.updateUser(user);

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

import { Request, Response } from 'express';
import { AppService } from '../app-service';
import { User } from '../entity/User.entity';


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
    const id: number = parseInt(request.params.id);
    const user: User = await this.service.getUser(id);
    
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
    const user: User = await this.service.createUser(request.body);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(201).render('user-detail', {
      title: 'User Details',
      user: user,
    });
  }

  public async getUserUpdate(request: Request, response: Response): Promise<void> {
    const id = parseInt(request.params.id);
    const user: User = await this.service.getUser(id);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-edit', {
      title: 'Edit User',
      user: user,
    });
  }

  public async patchUserUpdate(request: Request, response: Response): Promise<void> {
    const user: User = await this.service.updateUser(request.body);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(204).redirect(`/users/${user.id}`);
  }

  public async deleteUser(request: Request, response: Response): Promise<void> {
    const id = parseInt(request.params.id);
    await this.service.deleteUser(id);
    response.status(203).redirect(301, '/users');
  }
}

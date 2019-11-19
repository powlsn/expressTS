import { Request, Response } from 'express';
import { EntityManager, getManager } from 'typeorm';
import { User } from '../entity/User.entity';
import { IUser } from '../models/User';

export class UserController {
  constructor(readonly manager: EntityManager) {}

  public async getUsers(request: Request, response: Response): Promise<void> {
    const user = await this.manager.find(User);
    response.status(200).render('user-list', {
      title: 'Users List',
      users: user,
    });
  }

  public async getUserById(request: Request, response: Response): Promise<void> {
    const id = parseInt(request.params.id);
    const user = await this.getUserWithPhotosQuery(id);
    if (user) {
      response.status(200).render('user-detail', {
        title: 'User Details',
        user: user,
      });
    } else {
      response.redirect(400, 'user-detail');
    }
  }

  public getCreateUser(request: Request, response: Response): void {
    response.status(200).render('user-add', {
      title: 'User Add',
    });
  }

  public async createUser(request: Request, response: Response): Promise<void> {
    const user = this.getUserFromParams(request);
    const userCreated = await this.manager.save(user);
    if (userCreated) {
      response.status(201).render('user-detail', {
        title: 'User Details',
        user: userCreated,
      });
    } else {
      response.redirect(400, '/users');
    }
  }

  public async getUserUpdate(request: Request, response: Response): Promise<void> {
    const id = parseInt(request.params.id, 10);
    const user = await this.getUserWithPhotosQuery(id);
    if (user) {
      response.status(200).render('user-edit', {
        title: 'Edit User',
        user: user,
      });
    } else {
      response.redirect(400, '/users');
    }
  }

  public async updateUser(request: Request, response: Response): Promise<void> {
    console.log(request.body);
    const updatedUser = this.getUserFromParams(request);
    const user = await this.manager.save(updatedUser);
    if (user) {
      response.status(204).redirect(`/users/${user.id}`);
    } else {
      response.redirect(400, '/users');
    }
  }

  public async deleteUser(request: Request, response: Response): Promise<void> {
    await this.manager.delete(User, request.params.id);
    response.status(203).redirect(301, '/users');
  }

  private async getUserWithPhotosQuery(id: number): Promise<User> {
    return await this.manager
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.photos', 'photo')
      .where('user.id = :id', { id: id })
      .getOne();
  }

  private getUserFromParams(request: Request): User {
    let value: IUser = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
    };
    console.log("TCL: UserController -> constructor -> request.body", request.body)
    

    if (request.params.id) {
      value.id = parseInt(request.params.id, 10);
    }

    const user = Object.assign(new User(), value);
    return user;
  }
}

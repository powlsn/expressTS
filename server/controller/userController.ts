import { Request, Response } from 'express';
import { UserService } from '../user-service';
import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { requestUserMapper } from '../middleware/requestUserMapper';
import { photoArray } from '../middleware/photoArrayParser';
import { PhotoService } from '../photo-service';
import { Connection, Repository } from 'typeorm';

export class UserController {
  constructor(readonly connection: Connection) {}
  private userService: UserService = new UserService(this.connection);
  private photoService: PhotoService = new PhotoService(this.connection);

  private userRepo: Repository<User> = this.connection.getRepository(User);
  private photoRepo: Repository<Photo> = this.connection.getRepository(Photo);

  public async getUsers(request: Request, response: Response): Promise<void> {
    const user = await this.userService.getUsers();

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-list', {
      title: 'Users List',
      users: user,
    });
  }

  public async getUserById(request: Request, response: Response): Promise<void> {
    const user: User = await this.userService.getUser(parseInt(request.params.id), ['photos']);

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
    user = await this.userService.createUser(user);

    // check if photos exists
    // if true -> loop through -> set user on photo (photo.user = user)
    // photo.save() like exampple below
    // TODO: run a method to check if some photos have been provided.
    const photo2 = new Photo();
    photo2.imageUrl = 'test img';
    photo2.user = user;
    await this.photoService.createPhoto(photo2);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(201).render('user-detail', {
      title: 'User Details',
      user: user,
    });
  }

  public async getUserUpdate(request: Request, response: Response): Promise<void> {
    const user: User = await this.userService.getUser(parseInt(request.params.id), ['photos']);
    console.log('TCL: UserController -> constructor -> user', user.photos[0]);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(200).render('user-edit', {
      title: 'Edit User',
      user: user,
    });
  }

  public async patchUserUpdate(request: Request, response: Response): Promise<void> {
    const paramsuser = requestUserMapper(request);
    const dbuser = await this.userRepo.findOne(request.params.id);
    const user = await this.userRepo.merge(dbuser, paramsuser);
    await this.userRepo.save(user);

    const paramsphotos = photoArray(request.body.photo);
    for (const photo of paramsphotos) {
      // let temp;
      photo.user = user;
      // if (typeof photo.id !== 'undefined') {
      //   temp = await this.photoRepo.findOne(photo.id);
      //   const merged = this.photoRepo.merge(temp, photo);
      // } else {
      //   await this.photoRepo.save(photo);
      // }
    }
    await this.photoRepo.save(paramsphotos);

    // run a method to check if some photos have been provided.
    console.log('TCL: UserController -> constructor -> photos', paramsphotos);

    // workaround to save photos
    // const photo1 = new Photo();
    // photo1.imageUrl = 'abc';
    // photo1.user = user;
    // await this.photoService.createPhoto(photo1);
    // const photo2 = new Photo();
    // photo2.imageUrl = 'def';
    // photo2.user = user;
    // await this.photoService.createPhoto(photo2);

    // const user: User = await this.userService.getUser(paramsuser.id, ['photos']);
    // user.photos = photos;

    // // here starts the code its actual task
    // const u: User = await this.userService.updateUser(user);

    if (!user) {
      response.redirect(400, '/users');
    }

    response.status(204).redirect(`/users/${user.id}`);
  }

  public async deleteUser(request: Request, response: Response): Promise<void> {
    const id = parseInt(request.params.id);
    await this.userService.deleteUser(id);
    response.status(203).redirect(301, '/users');
  }
}

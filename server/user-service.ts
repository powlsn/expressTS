import { Repository } from 'typeorm';
import { User } from './entity/User.entity';
import { Photo } from './entity/Photo.entity';


export class UserService {
  constructor(readonly repo: Repository<User>) {}

  public async getAllUsers(): Promise<User[]> {
    return await this.repo.find({ relations: ['photos']});
  }

  public async getUser(id: number): Promise<User> {
    return await this.repo.findOne({ where: { id: id }, relations: ['photos'] });
  }
    
  public async createUser(user: User): Promise<User>;
  public async createUser(user: User, photos: Photo[]): Promise<User>;
  public async createUser(user: User, photos?: Photo[]): Promise<User> {
    const createdUser = await this.repo.save(user);

    if (typeof photos !== 'undefined') {
      photos.map(photo => {
        photo.user = createdUser;
      });
      // maybe i have to put photoRepo in here ?
      await this.repo.save(createdUser);
    }

    return this.repo.findOne(createdUser, { relations: ['photos']});
  }

  public async updateUser(user: User): Promise<User> {
    const updatedResult = await this.repo.update(user.id, user);
    console.log(updatedResult);
    // if (photos.length !== 0) {
    //   for (const photo of photos) {
    //     await this.updatePhoto(photo);
    //   }
    // }
    return this.repo.findOne(user.id, { relations: ['photos']});
  }



  public async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    return await this.repo.remove(user);
  }
}

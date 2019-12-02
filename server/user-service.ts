import { Repository, Connection } from 'typeorm';
import { User } from './entity/User.entity';
import { Photo } from './entity/Photo.entity';

export class UserService {
  constructor(readonly connection: Connection) {
    this.userRepo = connection.getRepository(User);
    this.photoRepo = connection.getRepository(Photo);
  }

  private userRepo: Repository<User>;
  private photoRepo: Repository<Photo>;

  public async getUsers(relation?: string[]): Promise<User[]> {
    if (typeof relation !== 'undefined' && relation.length > 0) {
      return await this.userRepo.find({ relations: relation });
    }
    return await this.userRepo.find();
  }

  public async getUser(id: number, relation?: string[]): Promise<User> {
    if (typeof relation !== 'undefined' && relation.length > 0) {
      return await this.userRepo.findOne({ where: { id: id }, relations: relation });
    }
    return await this.userRepo.findOne({ where: { id: id } });
  }

  public async createUser(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  public async updateUser(user: User, photos?: Photo[]): Promise<User> {
    console.log('TCL: UserService -> user', user);
    console.log('TCL: UserService -> photos', photos);
    const updatedResult = await this.connection.manager.save(user);
    if (typeof photos !== 'undefined' && photos.length > 0) {
      await this.photoRepo.save(photos, user);
    }
    return this.userRepo.findOne(user.id, { relations: ['photos'] });
  }

  public async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    return await this.userRepo.remove(user);
  }
}

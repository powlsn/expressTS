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

  public async getUsers(): Promise<User[]>;
  public async getUsers(relation: string[]): Promise<User[]>;
  public async getUsers(relation?: string[]): Promise<User[]> {
    if (typeof relation !== 'undefined' && relation.length > 0) {
      return await this.userRepo.find({ relations: relation});
    }
    return await this.userRepo.find();
  }

  public async getUser(id: number): Promise<User>;
  public async getUser(id: number, relation: string[]): Promise<User>;
  public async getUser(id: number, relation?: string[]): Promise<User> {
    if (typeof relation !== 'undefined' && relation.length > 0) {
      return await this.userRepo.findOne({ where: { id: id }, relations: relation });
    }
    return await this.userRepo.findOne({ where: { id: id } });
  }
    
  public async createUser(user: User): Promise<User>;
  public async createUser(user: User, photos: Photo[]): Promise<User>;
  public async createUser(user: User, photos?: Photo[]): Promise<User> {
    const createdUser = await this.userRepo.save(user);

    if (typeof photos !== 'undefined' && photos.length > 0) {
      for (const photo of photos) {
        photo.user = createdUser;
        await this.photoRepo.save(photo);
      }
      // maybe i have to put photoRepo in here ?
      return this.userRepo.findOne(createdUser, { relations: ['photos']});
    }
    return this.userRepo.findOne(createdUser);
  }

  public async updateUser(user: User): Promise<User>;
  public async updateUser(user: User, photos: Photo[]): Promise<User>;
  public async updateUser(user: User, photos?: Photo[]): Promise<User> {
    const updatedResult = await this.userRepo.update(user.id, user);
    console.log(updatedResult);
    if (typeof photos !== 'undefined' && photos.length > 0) {
      for (const photo of photos) {
        // TODO do something with the photo
        await this.photoRepo.update(photo.id, photo);
      }
      return this.userRepo.findOne(user.id, { relations: ['photos']});
    }
    return this.userRepo.findOne(user.id);
  }
  
  public async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    return await this.userRepo.remove(user);
  }
}

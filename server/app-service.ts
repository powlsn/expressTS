import { EntityManager, Repository, getRepository, UpdateResult } from 'typeorm';
import { User } from './entity/User.entity';
import { Photo } from './entity/Photo.entity';


export class AppService {
  constructor(readonly manager: EntityManager) {}

  private userRepository: Repository<User> = this.manager.getRepository(User);
  private photoRepository: Repository<Photo> = this.manager.getRepository(Photo);

  public async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id }, relations: ['photos'] });
  }

  public async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async createPhotos(user: User, photos: Photo[]): Promise<Photo[]> {
    return await this.photoRepository.save(photos);
  }

  public async updateUser(user: User, photos?: Photo[]): Promise<User> {
    let res: UpdateResult;
    if (photos.length !== 0) {
      for (const photo of photos) {
        res = await this.updatePhoto(photo);
      }
    }
    console.log("TCL: AppService -> constructor -> res", res)
    
    return await this.userRepository.save(user);
  }

  public async updatePhoto(photo: Photo): Promise<UpdateResult> {
    return await this.photoRepository.update(photo.id, photo);
  }

  public async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    return await this.userRepository.remove(user);
  }
}

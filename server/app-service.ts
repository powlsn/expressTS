import { EntityManager, Repository, getRepository } from 'typeorm';
import { User } from './entity/User.entity';
import { Photo } from './entity/Photo.entity';
import { IUser } from './interfaces/IUser';


export class AppService {
  constructor(readonly manager: EntityManager) {}

  private userRepository: Repository<User> = this.manager.getRepository(User);
  private photoRepository: Repository<Photo> = this.manager.getRepository(Photo);
  private user: User;

  public async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUser(id: number | string): Promise<User> {
    this.user = await this.getUserById(id);
    return this.user;
  }

  public async createUser(user: IUser): Promise<User> {
    this.user = new User();
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
    this.user = await this.userRepository.save(this.user);
    
    let photos = this.photosFromParams(user.photos, this.user.id);
    
    await this.photoRepository.save(photos);
    const createdUser = await this.getUserById(this.user.id);

    return createdUser;
  }

  public async updateUser(user: IUser): Promise<User> {
    this.user = await this.getUserById(user.id);
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
    this.user = await this.userRepository.save(this.user);

    let photos = await this.photoRepository.find({
      relations: ['user'],
      where: {
        user: user.id,
      },
    });

    await this.photoRepository.remove(photos);
    photos = this.photosFromParams(user.photos, this.user.id);
    await this.photoRepository.save(photos);
    return this.user;
  }

  public async deleteUser(id: number | string): Promise<User> {
    this.user = await this.getUserById(id);
    return await this.userRepository.remove(this.user);
  }

  private async getUserById(id: number | string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id }, relations: ['photos'] });
  }

  private photosFromParams(photos: string[], userid: number): Photo[] {
    return this.photoRepository.create(
      photos
        .filter(e => e) // rejects empty strings
        .map(item =>
          Object.assign(new Photo(), {
            imageUrl: item,
            user: userid,
          }),
        ),
    );
  }
}

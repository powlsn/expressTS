import { Repository, Connection } from 'typeorm';
import { User } from './entity/User.entity';

export class UserService {
  constructor(readonly connection: Connection) {}

  private userRepo: Repository<User> = this.connection.getRepository(User);

  public async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  public async getUser(id: number, relation?: string[]): Promise<User> {
    return await this.userRepo.findOne({ where: { id: id }, relations: relation });
  }

  public async createUser(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  public async updateUser(user: User): Promise<User> {
    const savedUser = await this.userRepo.save(user);
    return await this.getUser(savedUser.id, ['photos']);
  }

  public async deleteUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    return await this.userRepo.remove(user);
  }
}

import { Repository, Connection } from 'typeorm';
import { User } from './entity/User.entity';

export class UserService {
  constructor(readonly connection: Connection) {}

  private userRepo: Repository<User> = this.connection.getRepository(User);

  public async getUser(): Promise<User[]> {
    return await this.userRepo.find();
  }

  public async getById(id: number, relation?: string[]): Promise<User> {
    return await this.userRepo.findOne({ where: { id: id }, relations: relation });
  }

  public async save(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  public async update(user: User): Promise<User> {
    const oldUser = await this.userRepo.findOne(user.id);
    const updated = this.userRepo.merge(oldUser, user);
    return await this.userRepo.save(updated);
  }

  public async delete(id: number): Promise<User> {
    const user = await this.getById(id);
    return await this.userRepo.remove(user);
  }
}

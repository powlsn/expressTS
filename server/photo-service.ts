import { Repository, UpdateResult, DeleteResult, Connection } from 'typeorm';
import { Photo } from './entity/Photo.entity';

export class PhotoService {
  constructor(readonly connection: Connection) {}

  private photoRepo: Repository<Photo> = this.connection.getRepository(Photo);

  public async save(photo: Photo[]): Promise<Photo[]> {
    return await this.photoRepo.save(photo);
  }

  public async getByUserId(id: number): Promise<Photo[]> {
    return await this.photoRepo.find({ where: { userId: id } });
  }

  public async getById(id: number): Promise<Photo> {
    return await this.photoRepo.findOne(id, { relations: ['user'] });
  }

  public async update(photo: Photo): Promise<UpdateResult> {
    return await this.photoRepo.update(photo.id, photo);
  }

  public async deleteById(id: number): Promise<DeleteResult> {
    return await this.photoRepo.delete(id);
  }

  public async delete(photo: Photo[]): Promise<Photo[]> {
    return await this.photoRepo.remove(photo);
  }
}

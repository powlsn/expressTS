import { Repository, UpdateResult, DeleteResult, Connection } from 'typeorm';
import { Photo } from './entity/Photo.entity';

export class PhotoService {
  constructor(readonly connection: Connection) {}

  private photoRepo: Repository<Photo> = this.connection.getRepository(Photo);

  public async createPhoto(photo: Photo): Promise<Photo> {
    return await this.photoRepo.save(photo);
  }

  public async getPhotoById(id: number): Promise<Photo> {
    return await this.photoRepo.findOne(id, { relations: ['user'] });
  }

  public async updatePhoto(photo: Photo): Promise<UpdateResult> {
    return await this.photoRepo.update(photo.id, photo);
  }

  public async deletePhoto(id: number): Promise<DeleteResult> {
    return await this.photoRepo.delete(id);
  }
}

import { Repository, UpdateResult, DeleteResult, Connection } from "typeorm";
import { Photo } from "./entity/Photo.entity";

export class PhotoService {
  constructor(readonly connection: Connection) {
    this.repo = connection.getRepository(Photo);
  }

  private repo: Repository<Photo>;
  
  public async createPhoto(photo: Photo): Promise<Photo> {
    return await this.repo.save(photo);
  }

  public async getPhotoById(id: number): Promise<Photo> {
    return await this.repo.findOne(id, { relations: ['user'] });
  }

  public async updatePhoto(photo: Photo): Promise<UpdateResult> {
    return await this.repo.update(photo.id, photo);
  }

  public async deletePhoto(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
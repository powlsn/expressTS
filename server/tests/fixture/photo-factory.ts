import { UserService } from "../../user-service";
import { Photo } from "../../entity/Photo.entity";
import { PhotoService } from "../../photo-service";


export class PhotoFactory {

  constructor(readonly photoService: PhotoService) {}

  // for later use with factory-ts
  json(params: object = {}) {
    return Object.assign({
      photoUrl: 'foo.jpg',
    }, params
    )
  }

  build(params: object = {}): Photo {
    return Object.assign(new Photo(), this.json(params));
  }  

  create(params: Object = {}): Promise<Photo> {
    const photo = this.build(params);
    return this.photoService.createPhoto(photo);
  }
}

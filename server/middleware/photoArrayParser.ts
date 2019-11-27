import { Photo } from '../entity/Photo.entity';

export const photosArrayParser = (photos: string[], userid: number): Photo[] => {
  return photos
    .filter(e => e) // rejects empty strings
    .map(item =>
      Object.assign(new Photo(), {
        id: item[0],
        imageUrl: item[1],
        user: userid,
      }),
    );
};

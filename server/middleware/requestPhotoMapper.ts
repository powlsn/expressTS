import { Photo } from '../entity/Photo.entity';

function mapToExist(item: string[]): Photo {
  return Object.assign(new Photo(), {
    id: item[0],
    imageUrl: item[1],
    user: item[2],
  });
}

function mapToNew(item: string[]): Photo {
  return Object.assign(new Photo(), {
    imageUrl: item[0],
    user: item[1],
  });
}

function photoMapper(elem: string[]): Photo {
  const items = elem.filter(e => e); // rejects empty strings
  // mapping function switch
  if (items.length <= 1) return;
  else if (items.length === 2) {
    return mapToNew(items);
  } else {
    return mapToExist(items);
  }
}

function requestPhotoMapper(photos: string[][]): Photo[] {
  const photoArray: Photo[] = [];
  photos.forEach(element => {
    photoArray.push(photoMapper(element));
  });
  return photoArray.filter(e => e); // reject undefined entries
}

// const photosArrayParser = (photos: string[], userid: number): Photo[] => {
//   return photos
//     .filter(e => e) // rejects empty strings
//     .map(item =>
//       Object.assign(new Photo(), {
//         id: item[0],
//         imageUrl: item[1],
//         user: userid,
//       }),
//     );
// };

// function photoStage1(photos: string[][]) {
//   let pic;
//   let obj = {};
//   let keys = ['id', 'imgUrl', 'user'];
//   photos.forEach(element => {
//     pic = element.filter(e => e);
//     if (typeof pic !== 'undefined' && pic.length > 0) {
//       if (pic.length > 1) {
//         for (let i in keys) {
//           obj[keys[i]] = pic[i];
//         }
//       } else if (pic.length === 1) {
//         obj[keys[1]] = pic[0];
//       }
//       return obj;
//     }
//   });
// photos.filter(e => e); // rejects empty strings;
// elem = ['', '', ''] photoid, str, userid
// let obj;
// const test = elem.filter(e => e).length;
// switch (test) {
//   case 1:
//     break;
//   case 2:
//     obj['imageUrl'] = elem[1];
//     obj['user'] = elem[2];
//     return obj;
//   case 3:
//     obj['id'] = elem[0];
//     obj['imageUrl'] = elem[1];
//     obj['user'] = elem[2];
//     return obj;
//   default:
//     console.log('default run!');
//     break;
// }
// }

// function photoStage1(item: string[]): Photo {
//   item = item.filter(e => e);
//   return photoStage2(item);
// }

// function photoStage2(item: string[]): Photo {
//   if (typeof item !== 'undefined' && item.length > 0) {
//     if (item.length > 2) {
//       return mapToPhotoExist(item);
//     } else if (item.length === 2) {
//       return mapToNewPhoto(item);
//     }
//   }
// }

// function to filter empty shit!
export { requestPhotoMapper };

import { Photo } from '../entity/Photo.entity';
import { User } from '../entity/User.entity';

const photosArrayParser = (photos: string[], userid: number): Photo[] => {
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

function createPic(alias, propName, val) {
  alias.set(propName, val);
}

const photoArray = (photos: string[][], userid: number): any => {
  console.log("TCL: photos", photos)
  let pic, obj = {};
  let keys = ['id', 'imgUrl', 'user'];
  // let photo = new Photo({id: 42, imageUrl: 'abc', user: userid});
  // pic = photos.forEach(element => {
  //   return keys.reduce((o, k, i) => ({...o, [k]: element[i]}), {});
  // });
  
  photos.forEach(element => {
    pic = element.filter(e => e);
    if (typeof pic !== 'undefined' && pic.length > 0) {
      if(pic.length > 1) {
        for(let i in keys) {
          obj[keys[i]] = pic[i];
        };
      }
      else if(pic.length === 1) {
        obj[keys[1]] = pic[0];
      }
      console.log("TCL: obj", obj)
    }
  });


  // for (const key in photo) {
  //   if (photo.hasOwnProperty(key)) {
  //     const element = photo[key];
  //     console.log("TCL: key", key)
  //     console.log("TCL: element", element);
  //   }
  // }


  


};

// function to filter empty shit!
export { photosArrayParser, photoArray }
import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { UserService } from '../user-service';
import { Connection, getConnection, createConnection } from 'typeorm';
import { UserFactory } from './fixture/user-factory';
import { PhotoFactory } from './fixture/photo-factory';
import { PhotoService } from '../photo-service';
import './database/pg-cleaner-hooks';


describe(PhotoService.name, () => {

  let connection: Connection;
  let userService: UserService;
  let photoService: PhotoService;
  let userFactory: UserFactory;
  let photoFactory: PhotoFactory;
  
  beforeAll(async () => {
    // setup test env
    connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Awesome1",
      database: "exTest",
      entities: ['../**/*.entity.ts'],
    });
  
    const defConn = getConnection('default').manager;
    const userRepo = defConn.getRepository(User);
    const photoRepo = defConn.getRepository(Photo);
    userService = new UserService(userRepo);
    userFactory = new UserFactory(userService);
    photoService = new PhotoService(photoRepo);
    photoFactory = new PhotoFactory(photoService);
  });

  afterAll(async () => {
    await connection.close();
  });


  describe('#createUser', () => {
    it('should create a User with Photos', async () => {
      const user = userFactory.build();
      const photo = photoFactory.build();
      user.photos.push(photo);
      const createdUser = await userService.createUser(user);
      // todo lazy user photos
      expect(createdUser.photos.length).toEqual(1);
    });
  })
  
  describe('#updateUser', () => {
    it('should update photos of the user', async () => {
      // arrange
      const photo = photoFactory.build();
      const user = await userFactory.create({photos: [photo]});
  
      // act
      const otherPhoto = photoFactory.build();
      user.photos = [otherPhoto];
      const updatedUser = await userService.updateUser(user);
    
      // assert
      expect(updatedUser.photos.length).toEqual(1);
      expect(updatedUser.photos[0].imageUrl).toEqual([otherPhoto.imageUrl]);
    });
  });

  describe('#deleteUser', () => {
    it('should delete a User with related Photos', async () => {
      // create a user with 2 photos
      // fetch this user from db and check
      expect(user.id).toEqual(createdUser.id);
      expect(user.photos.length).toEqual(2);
      // delete
      // 1. check
      expect(photos.length).toEqual(0);
      expect(user).toBeUndefined();
    });
  });

  describe('#deletePhoto', () => {
    it('should delete a Photo', async () => {
      // create a user with two photo
      expect(user.id).toEqual(createdUser.id);
      // fetch all photos for the given user
      expect(photos.length).toEqual(2);
      // delete
      expect(photos.length).toEqual(1);
    });
  });
});

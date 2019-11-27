import { User } from '../entity/User.entity';
import { Photo } from '../entity/Photo.entity';
import { AppService } from '../app-service';
import { Connection, getConnection, createConnection } from 'typeorm';
import { UserFactory } from './fixture/user-factory';
import './database/pg-cleaner-hooks';

describe('Photo Entity Tests', () => {

  let appService: AppService;
  let connection: Connection;
  let userFactory: UserFactory;
  let user: User;
  let photo: Photo;
  
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
  
    const entityManager = getConnection('default').manager;
    appService = new AppService(entityManager);
    userFactory = new UserFactory(appService);
    user = new User();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('test User with Photo create', async () => {
    // TODO: create a single photo for global user
    const user1 = await userFactory.create({photos: ['test.jpg',]});
    // 2. check if user is created
    expect(user1.id).toBeDefined();
    expect(user1.id).not.toBeNull();
    expect(user1).toMatchObject(user);
    expect(user1.photos).not.toBeUndefined();
    expect(user1.photos).not.toBeNull();
    expect(user1.photos[0].imageUrl).toMatch(/test/);
  });
  
  it('test Photo update', async () => {
    // 1. create a user
    const user1 = await userFactory.create({photos: ['test.jpg',]});
    expect(user1).toMatchObject(user);
    expect(user1.id).not.toBeNaN();
    expect(user1.photos.length).toBe(1);
    
    const obj = { id: user1.id, firstname: 'NewName', lastname: 'NewLastName', photos: ['update.jpg'] };
    const user2 = await appService.updateUser(obj);
    expect(user2).toMatchObject(user);
    expect(user2.id).not.toBeNaN();
    expect(user2.photos.length).toBe(1);
    expect(user2.photos[0].imageUrl).toMatch(/update/);
    expect(user2.photos[0].imageUrl).not.toMatch(/test/);
  });

  it('test User delete', () => {
    // setup
    // fetch
    // delete
    // 1. check
    // 2. check
  });

  it('test Photo delete', () => {
    // setup
    // fetch
    // delete
    // 1. check
    // 2. check
  });
});

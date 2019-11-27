import { User } from '../entity/User.entity';
import {
  getConnection,
  createConnection,
  Connection,
} from 'typeorm';
import { AppService } from '../app-service';
import './database/pg-cleaner-hooks';
import { UserFactory } from './fixture/user-factory';

describe('User Entity Tests', () => {
  
  let appService: AppService;
  let connection: Connection;
  let userFactory: UserFactory;
  let user: User;
  
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

  // beforeEach() : dataBase cleaner!

  it('create User', async () => {
    // here i should create a user and fetch from the db to test if it exists
    const user1 = await userFactory.create({photos: []});

    expect(user1.id).not.toBeUndefined();
    expect(user1.id).not.toBeNull();
    expect(user1).toMatchObject(user);
    expect(user1.firstname).not.toBeUndefined();
    expect(user1.firstname).not.toBeNull();
    expect(user1.lastname).not.toBeUndefined();
    expect(user1.lastname).not.toBeNull();
  });

  it('update User', async () => {
    // 1. create a user
    let user1 = await userFactory.create({photos: []});
    // 2. update user props
    const obj = { id: user1.id, firstname: 'NewName', lastname: 'NewLastName', photos: [] };
    user1 = await appService.updateUser(obj);
    // 3. check user updated values
    expect(user1).toBeDefined();
    expect(user1).toMatchObject(user);
    expect(user1.id).toBe(obj.id);
    expect(user1.firstname).not.toBeUndefined();
    expect(user1.firstname).not.toBeNull();
    expect(user1.lastname).not.toBeUndefined();
    expect(user1.lastname).not.toBeNull();
  });

  it('delete User', async () => {
    // 1. create user
    let user1 = await userFactory.create({photos: []});
    // 2. delete user
    user1 = await appService.deleteUser(user1.id);
    // check if the deleted user has an id (should be undefined)
    expect(user1.id).toBeUndefined();
    expect(user1.id).toBeFalsy();
  });
});

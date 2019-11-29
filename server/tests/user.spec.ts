import { User } from '../entity/User.entity';
import {
  getConnection,
  createConnection,
  Connection,
} from 'typeorm';
import { UserService } from '../user-service';
import './database/pg-cleaner-hooks';
import { UserFactory } from './fixture/user-factory';

describe(UserService.name, () => {
  
  let appService: UserService;
  let connection: Connection;
  let userFactory: UserFactory;
  
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
    // TODO maybe a bit clean up
    const manager = getConnection('default').manager;
    const userRepo = manager.getRepository(User);
    appService = new UserService(userRepo);
    userFactory = new UserFactory(appService);
  });

  afterAll(async () => {
    await connection.close();
  });

  // beforeEach() : dataBase cleaner!
  describe('getAllUsers', () => {
    it('should return an empty list', async () => {
      let users = await appService.getAllUsers();
      expect(users.length).toEqual(0);
    });
    it('should return all persisted users', async () => {
      const user1 = await userFactory.create();
      const user2 = await userFactory.create();
      
      let users = await appService.getAllUsers();
      expect(users.sort()).toEqual([user1, user2].sort());
    });
  })

  describe('#createUser', () => {
    it('should create User', async () => {
      // here i should create a user and fetch from the db to test if it exists
      let users = await appService.getAllUsers();
      expect(users.length).toEqual(0);
      const user = await userFactory.build();
      await appService.createUser(user);
      users = await appService.getAllUsers();
      expect(users.length).toEqual(1);
    });

    it('should create a User with fields', async () => {
      const user = await userFactory.build({
        firstname: 'der-Vorname',
        lastname: 'der-Nachname',
      });
      const createdUser = await appService.createUser(user);
      const loadedUser = await appService.getUser(createdUser.id);
      expect(loadedUser.firstname).toEqual('der-Vorname');
      expect(loadedUser.lastname).toEqual('der-Nachname');
    });
  });
  
  describe('#updateUser', () => {

    it('should return an object of type User', async () => {
      const newUser = userFactory.build();
      const user = await appService.createUser(newUser);
      // typeof liefert object ^ liefert User type
      expect(user.constructor.name).toEqual('User');
    });

    it('should update fields', async () => {
      // 1. create a user
      let user = await userFactory.create();
      // 2. update user props
      user.firstname = 'NewName';
      user.lastname = 'NewLastName';      
      user = await appService.updateUser(user);
      // 3. check user updated values
      const reloadedUser = await appService.getUser(user.id);
      expect(reloadedUser.firstname).toEqual(user.firstname);
      expect(reloadedUser.lastname).toEqual(user.lastname);
    });  
  });
  
  describe('#deleteUser', () => {
    it('should delete a User from database', async () => {
      // 1. create users
      let user1 = await userFactory.create();
      let user2 = await userFactory.create();
      expect((await appService.getAllUsers()).length).toEqual(2);
      // 2. delete a user
      user1 = await appService.deleteUser(user1.id);
      // check if the deleted user has an id (should be undefined)
      expect((await appService.getAllUsers()).length).toEqual(1);
      const loadUser1 = await appService.getUser(user1.id)
      expect(loadUser1).toBeUndefined();
      const loadUser2 = await appService.getUser(user2.id)
      expect(loadUser2).toBeDefined();
    });
  });
});

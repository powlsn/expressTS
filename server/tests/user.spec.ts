import { getConnection, createConnection, Connection } from 'typeorm';
import { UserService } from '../user-service';
import { UserFactory } from './fixture/user-factory';
import './database/pg-cleaner-hooks';

describe(UserService.name, () => {
  let userService: UserService;
  let connection: Connection;
  let userFactory: UserFactory;

  beforeAll(async () => {
    // setup test env
    connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Awesome1',
      database: 'exTest',
      entities: ['../**/*.entity.ts'],
    });
    // TODO maybe a bit clean up
    const manager = getConnection('default').manager;
    userService = new UserService(connection);
    userFactory = new UserFactory(userService);
  });

  afterAll(async () => {
    await connection.close();
  });

  // beforeEach() : dataBase cleaner!
  describe('getAllUsers', () => {
    it('should return an empty list', async () => {
      const users = await userService.getUsers();
      expect(users.length).toEqual(0);
    });
    it('should return all persisted users', async () => {
      const user1 = await userFactory.create();
      const user2 = await userFactory.create();

      const users = await userService.getUsers();
      expect(users.sort()).toEqual([user1, user2].sort());
    });
  });

  describe('#createUser', () => {
    it('should create User', async () => {
      // here i should create a user and fetch from the db to test if it exists
      let users = await userService.getUsers();
      expect(users.length).toEqual(0);
      const user = await userFactory.build();
      await userService.createUser(user);
      users = await userService.getUsers();
      expect(users.length).toEqual(1);
    });

    it('should create a User with fields', async () => {
      const user = await userFactory.build({
        firstname: 'der-Vorname',
        lastname: 'der-Nachname',
      });
      const createdUser = await userService.createUser(user);
      const loadedUser = await userService.getUser(createdUser.id);
      expect(loadedUser.firstname).toEqual('der-Vorname');
      expect(loadedUser.lastname).toEqual('der-Nachname');
    });
  });

  describe('#updateUser', () => {
    it('should return an object of type User', async () => {
      const newUser = userFactory.build();
      const user = await userService.createUser(newUser);
      // typeof liefert object ^ liefert User type
      expect(user.constructor.name).toEqual('User');
    });

    it('should update fields', async () => {
      // 1. create a user
      let user = await userFactory.create();
      // 2. update user props
      user.firstname = 'NewName';
      user.lastname = 'NewLastName';
      user = await userService.updateUser(user);
      // 3. check user updated values
      const reloadedUser = await userService.getUser(user.id);
      expect(reloadedUser.firstname).toEqual(user.firstname);
      expect(reloadedUser.lastname).toEqual(user.lastname);
    });
  });

  describe('#deleteUser', () => {
    it('should delete a User from database', async () => {
      // 1. create users
      let user1 = await userFactory.create();
      const user2 = await userFactory.create();
      expect((await userService.getUsers()).length).toEqual(2);
      // 2. delete a user
      user1 = await userService.deleteUser(user1.id);
      // check if the deleted user has an id (should be undefined)
      expect((await userService.getUsers()).length).toEqual(1);
      const loadUser1 = await userService.getUser(user1.id);
      expect(loadUser1).toBeUndefined();
      const loadUser2 = await userService.getUser(user2.id);
      expect(loadUser2).toBeDefined();
    });
  });
});

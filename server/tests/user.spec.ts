import { User } from '../entity/User.entity';
import {
  getConnection,
  createConnection,
  Connection,
} from 'typeorm';
import { AppService } from '../app-service';

describe('User Entity Tests', () => {
  
  let appService: AppService;
  let connection: Connection;
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
    user = new User();
  });

  afterAll(async () => {
    await connection.close();
  })

  // beforeEach() : dataBase cleaner!

  it('create User', async () => {
    // here i should create a user and fetch from the db to test if it exists
    const data = {firstname: 'firstname', lastname: 'lastname', photos: []};
    const cUser = await appService.createUser(data);

    expect(cUser.id).toBeDefined();
    expect(cUser.id).not.toBeUndefined();
    expect(cUser.id).not.toBeNull();
    expect(cUser).toMatchObject(user);
    expect(cUser.firstname).toContain(data.firstname);
    expect(cUser.lastname).toContain(data.lastname);
  });

  it('update User', async () => {
    // fetch a given user from db, update it's values, save it and fetch it agein to test if
    // 1. get a user // 
    this.user = await appService.getUser(10);
    // const u = us.shift();
    const data = { id:this.user.id, firstname: 'NewName', lastname: 'NewLastName', photos: [] };
    const userUpdated = await appService.updateUser(data);
    // 2. user has the updated values
    expect(userUpdated).toBeDefined();
    expect(userUpdated).toMatchObject(user);
    expect(userUpdated.id).toBe(data.id);
    expect(userUpdated.firstname).toContain(data.firstname);
    expect(userUpdated.lastname).toContain(data.lastname);
  });

  it('delete User', () => {
    // setup a user in db
    // fetch it
    // delete it
    // check if the deleted user has an id (should be undefined)
    // check if the data correspond to given values
    // check if db is empty (expected behavior)
  });
});

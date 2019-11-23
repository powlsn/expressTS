import { User } from '../entity/User.entity';

describe('User Entity', () => {
  it('test User create', () => {
    // here i should create a user and fetch from the db to test if it exists
  });

  it('test User update', () => {
    // fetch a given user from db, update it's values, save it and fetch it agein to test if
    // 1. user exists
    // 2. user has the updated values
  });

  it('test User read', () => {
    // fetch from db and check if user exists
    // 1. none user in db
    // setup a user
    // 2. user exists in db
  });

  it('test User delete', () => {
    // setup a user in db
    // fetch it
    // delete it
    // check if the deleted user has an id (should be undefined)
    // check if the data correspond to given values
    // check if db is empty (expected behavior)
  });
});

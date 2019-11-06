import { Model } from 'objection';

class User extends Model {
  static get tableName(): string {
    return 'user';
  }
}

module.exports = {
  User,
};

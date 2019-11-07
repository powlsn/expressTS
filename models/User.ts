import { Model } from 'objection';
import { knex } from '../db/knex';

Model.knex(knex);

export class User extends Model {
  static get tableName(): string {
    return 'user';
  }
  static get idColumn(): string {
    return 'id';
  }
  // fullName() {
  //   return this.firstname + ' ' + this.lastname;
  // }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'firstname', 'lastname'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        firstname: { type: 'string', minLength: 1, maxLength: 100 },
        lastname: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }
}

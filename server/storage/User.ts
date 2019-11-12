import { Model } from 'objection';

export class User extends Model {
  // static get tableName(): string {
  //   return 'user';
  // }
  static tableName = 'user';

  // static get idColumn(): string {
  //   return 'id';
  // }

  id!: number;

  // fullName() {
  //   return this.firstname + ' ' + this.lastname;
  // }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

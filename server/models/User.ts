import { Model } from 'objection';

export class User extends Model {
  
  readonly id!: number;
  firstname?: string;
  lastname?: string;
  
  static tableName = 'user';

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstname', 'lastname'],
      properties: {
        id: { type: 'integer' },
        firstname: { type: 'string', minLength: 1, maxLength: 100 },
        lastname: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }
}

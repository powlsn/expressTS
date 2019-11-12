import { Model } from 'objection';

export class User extends Model {
  // prettier-ignore
  readonly id!: number;
  name?: string;
  firstname?: string;
  lastname?: string;

  static tableName = 'user';

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static jsonSchema = {
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

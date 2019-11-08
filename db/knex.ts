import { Model } from 'objection';
const config = require('../../knexfile.js')['development'];

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const knex = require('knex')(config);

Model.knex(knex);

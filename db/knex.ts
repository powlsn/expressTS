const config = require('../../knexfile.js')['development'];

// module.exports = require('knex')(config);

export const knex = require('knex')(config);

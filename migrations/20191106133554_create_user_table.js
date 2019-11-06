exports.up = knex => {
  return knex.schema.createTable('user', table => {
    table.increments('id');
    table.string('name', 100).notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user');
};

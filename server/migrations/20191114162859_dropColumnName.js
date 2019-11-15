exports.up = knex => {
  return knex.schema.table('user', table => {
    table.dropColumn('name');
  });
};

exports.down = knex => {
  return knex.schema.alterTable('user', table => {
    table.string('name').defaultTo('nickname');
  });
};

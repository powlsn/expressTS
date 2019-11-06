exports.up = knex => {
  return knex.schema.alterTable('user', table => {
    table.string('firstname');
    table.string('lastname');
  });
};

exports.down = knex => {
  return knex.schema.table('user', table => {
    table.dropColumn('firstname');
    table.dropColumn('lastname');
  });
};

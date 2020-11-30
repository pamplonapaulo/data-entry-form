
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('firstName').notNullable();
    table.string('surname').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.string('gender').notNullable();
    table.string('dateOfBirth').notNullable();
    table.string('comments').nullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

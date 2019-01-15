import * as Knex from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments();

    t.text('email_address').notNullable();
    t.text('first_name').notNullable();
    t.text('last_name').notNullable();

    t.timestamps();
    t.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

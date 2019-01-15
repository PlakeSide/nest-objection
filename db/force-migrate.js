'use strict';

// WHAT THIS DOES
// get all tables
// drop all but the migrations
// delete all rows in migrations
// run all migrations
// run all seeds

const runAll = require('npm-run-all');

const databaseURL = process.env.DATABASE_URL || 'postgres://ds_development:password123@localhost:5432/ds_development';

if (!process.env.ALLOW_FORCE_MIGRATE) {
  throw new Error('Force Migrate Not Allowed!!!!!!');
}

const knex = require('knex')({
  client: 'pg',
  connection: databaseURL
});

let done = () => process.exit(0);

let errorHandler = err => {
  console.warn('ERROR!!!!');
  console.error(err.stack);
  return done();
};

let getTables = () =>
  knex
    .select('tablename')
    .from('pg_catalog.pg_tables')
    .where({ schemaname: 'public' });

let dropTables = tables => {
  if (!tables || tables.length === 0) {
    console.info('No tables to drop.');
    return Promise.resolve('No Tables to drop');
  }

  let tablenames = tables.map(tbl => '"' + tbl.tablename + '"').join(',');
  console.warn('Dropping: ', tablenames);
  return knex.schema.raw(`drop table ${tablenames}`);
};

let dropSequences = () => {
  return knex.schema.raw(`drop sequence if exists "events_transaction_id" cascade;`);
};

let migrateAndSeed = () => {
  console.log('Running Migrations and Seeds');
  return runAll(process.argv[2] === 'no-seed' ? ['db:migrate'] : ['db:migrate', 'db:seed'], {
    parallel: false,
    stdout: process.stdout,
    stderr: process.stderr
  });
};

let finish = results => {
  results.forEach(result => console.log(`${result.name} DONE! with status: ${result.code}`));
  console.timeEnd('ForceMigratTaskTime');
  return done();
};

getTables()
  .then(dropTables)
  .then(dropSequences)
  .then(migrateAndSeed)
  .then(finish)
  .catch(errorHandler);

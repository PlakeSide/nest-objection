require('dotenv').config();

const { knexSnakeCaseMappers } = require('objection');

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './db/migrations',
    extension: '.ts',
    stub: './db/.migration.ts.stub'
  },
  seeds: {
    directory: './db/seeds',
    extension: '.ts',
    stub: './db/.seed.ts.stub'
  },
  ...knexSnakeCaseMappers()
};

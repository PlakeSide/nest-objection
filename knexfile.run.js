require('dotenv').config();

const { knexSnakeCaseMappers } = require('objection');

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './dist/db/migrations'
  },
  seeds: {
    directory: './dist/db/seeds'
  },
  ...knexSnakeCaseMappers()
};

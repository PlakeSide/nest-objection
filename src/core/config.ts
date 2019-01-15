import 'dotenv/config';
import * as Knex from 'knex';

import * as packageJson from '../../package.json';

export class Config {
  isProduction: boolean;
  db: Knex.Config;
  port: number;
  packageJson: any;
}

export const configInstance: Config = {
  isProduction: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    client: 'pg',
    debug: process.env.KNEX_DEBUG === 'true',
    connection: process.env.DATABASE_URL
  },
  packageJson
};

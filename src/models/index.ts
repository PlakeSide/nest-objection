import { Module, Provider } from '@nestjs/common';
import { UserModel } from './user.model';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import * as pg from 'pg';
import { Config } from '../core/config';
import { CoreModule } from '../core';

const PG_DECIMAL_OID = 1700;
// https://github.com/tgriesser/knex/issues/927
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

const customProviders = [
  {
    provide: 'KnexConnection',
    useFactory: async (config: Config) => {
      const connection = Knex({
        ...config.db,
        ...knexSnakeCaseMappers(),
        wrapIdentifier: (value, origImpl) => {
          return origImpl(value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase());
        }
      });

      Model.knex(connection);
      return connection;
    },
    inject: [Config]
  }
];

const models = [UserModel];

const modelProviders: Provider[] = models.map(model => {
  return {
    provide: model.name,
    useValue: model
  };
});

@Module({
  providers: [...modelProviders, ...customProviders],
  exports: [...modelProviders, ...customProviders]
})
export class ModelModule {}

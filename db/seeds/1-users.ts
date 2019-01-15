import * as Knex from 'knex';
import * as faker from 'faker';

import { Model } from 'objection';
import { UserModel } from '../../src/models/user.model';

export async function seed(knex: Knex) {
  Model.knex(knex);

  return UserModel.query().insert(
    [1, 2, 3].map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      emailAddress: faker.internet.email()
    }))
  );
}

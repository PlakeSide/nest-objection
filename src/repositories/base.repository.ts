import { Model, ModelClass, Transaction } from 'objection';
import * as _ from 'lodash/fp';

export abstract class BaseRepository<T extends Model> {
  abstract modelClass: ModelClass<T>;

  async create(entity: Partial<T>, trx?: Transaction): Promise<T> {
    return this.modelClass.query(trx).insert(entity);
  }

  async delete(id: number, trx?: Transaction): Promise<number> {
    return this.modelClass.query(trx).deleteById(id);
  }

  async update(id: number, entity: Partial<T>, trx?: Transaction): Promise<number> {
    return this.modelClass
      .query(trx)
      .patch(_.omit(['id'], entity))
      .where({ id });
  }

  async findById(id: number): Promise<T> {
    return this.modelClass.query().findById(id);
  }

  async findAll(predicates: Partial<T>): Promise<T[]> {
    if (_.isEmpty(predicates)) {
      return this.modelClass.query();
    }

    return this.modelClass.query().where(predicates);
  }

  async deleteById(id: number): Promise<number> {
    return this.modelClass.query().deleteById(id);
  }
}

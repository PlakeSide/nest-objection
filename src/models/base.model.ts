import * as objection from 'objection';

export const buildDir = __dirname;

/**
 * Tempory usage of JS Library for soft deletes
 */
import { register as registerSoftDelete } from 'objection-softdelete';
// register softdelete for 'deletedAt' database column
registerSoftDelete(objection, { deleteAttr: 'deletedAt' });

export class BaseModel extends objection.Model {
  static softDelete = true;

  readonly id: number;

  /**
   * Row Metadata
   */
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  /**
   * Timestamps
   */
  $beforeInsert() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

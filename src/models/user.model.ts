import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  public emailAddress: string;
  public firstName: string;
  public lastName: string;
}

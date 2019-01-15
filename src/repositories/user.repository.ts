import { BaseRepository } from './base.repository';
import { UserModel } from '../models/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';

@Injectable()
export class UserRepository extends BaseRepository<UserModel> {
  constructor(@Inject('UserModel') public modelClass: ModelClass<UserModel>) {
    super();
  }
}

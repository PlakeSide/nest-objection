import { ModelModule } from '../models';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

const repositories = [UserRepository];

@Module({
  imports: [ModelModule],
  providers: [...repositories],
  exports: [...repositories]
})
export class RepositoryModule {}

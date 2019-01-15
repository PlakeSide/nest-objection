import { Module } from '@nestjs/common';
import { UserResolvers } from './user.resolvers';
import { RepositoryModule } from '../repositories';

@Module({
  imports: [RepositoryModule],
  providers: [UserResolvers]
})
export class ResolversModule {}

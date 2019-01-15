import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from '../repositories/user.repository';
import { Logger } from '../core/logger';

@Resolver('Users')
export class UserResolvers {
  constructor(private readonly logger: Logger, private readonly userRepo: UserRepository) {}

  @Query('users')
  async findUsers() {
    this.logger.debug('fetching users...');
    return await this.userRepo.findAll({});
  }

  @Query('user')
  async findUser(
    @Args('id', ParseIntPipe)
    id: number
  ) {
    this.logger.debug('fetching user by id...');
    return this.userRepo.findById(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: any) {
    this.logger.debug('creating new user...');
    return await this.userRepo.create(args);
  }
}

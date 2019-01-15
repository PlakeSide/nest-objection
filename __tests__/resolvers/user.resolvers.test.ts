import { UserResolvers } from '../../src/resolvers/user.resolvers';

describe('User resolvers', () => {
  test('users', async () => {
    new UserResolvers(null);
  });
});

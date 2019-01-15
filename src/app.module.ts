import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ResolversModule } from './resolvers';
import { RepositoryModule } from './repositories';
import { CoreModule } from './core';

@Module({
  imports: [
    CoreModule,
    RepositoryModule,
    ResolversModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/schema/graphql.schema.ts'),
        outputAs: 'class'
      },
      // FIXME: Should use config
      debug: true,
      playground: true
    })
  ]
})
export class ApplicationModule {}

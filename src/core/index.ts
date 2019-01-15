import { Global, Module } from '@nestjs/common';
import { createLogger, Logger } from './logger';
import { Config, configInstance } from './config';

@Global()
@Module({
  providers: [
    {
      provide: Config,
      useValue: configInstance
    },
    {
      provide: Logger,
      useFactory: (config: Config) => {
        return createLogger(config);
      },
      inject: [Config]
    }
  ],
  exports: [Config, Logger]
})
export class CoreModule {}

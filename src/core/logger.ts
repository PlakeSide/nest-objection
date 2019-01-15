import * as pino from 'pino';
import { Config } from './config';
import * as _ from 'lodash/fp';

export class Logger {
  info: pino.LogFn;
  debug: pino.LogFn;
  error: pino.LogFn;
  warn: pino.LogFn;
}

export function createLogger(config: Config): Logger {
  const baseSettings = {
    name: _.get('packageJson.name', config) || 'NO_DISPLAY_NAME_GIVEN',
    timestamp: () => `,"time":"${new Date().toISOString()}"`
  };

  if (config.isProduction) {
    return pino({
      ...baseSettings,
      level: 'info',
      prettyPrint: false
    });
  }

  return pino({
    ...baseSettings,
    level: 'debug',
    prettyPrint: {
      colorize: true
    } as any
  });
}

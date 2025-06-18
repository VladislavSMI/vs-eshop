import pino from 'pino';
import { isBrowser, isProduction } from '../utils/utils';

const logLevel = isProduction() ? 'info' : 'debug';

export const log = isBrowser()
  ? pino({
      level: logLevel,
      timestamp: pino.stdTimeFunctions.isoTime,
      browser: {
        asObject: true,
        write: (logObject) => {
          // eslint-disable-next-line no-console
          console.log('Browser Log:', logObject);
        },
      },
    })
  : pino({
      base: { container: 'vs-eshop-app' },
      level: logLevel,
      timestamp: pino.stdTimeFunctions.isoTime,
      redact: ['name', 'email', 'password', 'profile.address', 'profile.phone'],
      serializers: {
        error: pino.stdSerializers.err,
      },
    });

import { Pool, PoolConfig, QueryResult, QueryResultRow } from 'pg';
import { log } from './logging/log';
import { QueryParams } from './types';

/* eslint-disable no-underscore-dangle */
declare const globalThis: typeof global & {
  _pool?: Pool;
};

const createPool = () => {
  const poolConfig: PoolConfig = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };

  // For AWS RDS, we need to use an SSL connection to encrypt data in transit.
  // However, if we don't provide a CA certificate bundle, the client's default behavior
  // will reject the connection due to certificate verification failures.
  // Setting 'rejectUnauthorized: false' bypasses certificate verification, allowing
  // the connection to proceed with encryption. This is acceptable in controlled environments,
  // but for production, it's recommended to supply the proper CA certificate and set this to true.
  if (process.env.DB_SSL_ENABLED === 'true') {
    poolConfig.ssl = { rejectUnauthorized: false };
  }

  return new Pool(poolConfig);
};

// Use cached pool in development to prevent reinitialization on hot reload
const pool = globalThis._pool ?? createPool();
if (process.env.NODE_ENV !== 'production') globalThis._pool = pool;

pool.on('error', (error) => {
  log.error(
    {
      error,
    },
    'DB connection error',
  );
});

export async function executeQuery<T extends QueryResultRow>({
  query,
  values,
}: QueryParams): Promise<QueryResult<T>> {
  try {
    return await pool.query<T>(query, values);
  } catch (error) {
    log.error(
      {
        error,
        query,
        values: JSON.stringify(values),
      },
      'Query execution failed',
    );
    throw error;
  }
}

// Graceful shutdown with error handling
async function shutdownPool(signal: string, error?: Error) {
  if (error) {
    log.fatal(
      { error },
      `${signal} received. Initiating shutdown due to error.`,
    );
  } else {
    log.info(`${signal} received. Initiating shutdown.`);
  }

  try {
    await pool.end();
    log.info('PostgreSQL pool has been closed.');
    process.exit(0);
  } catch (shutdownError) {
    log.error(
      { error: shutdownError },
      'Error during PostgreSQL pool shutdown',
    );
    process.exit(1);
  }
}

// Attach process event listeners only once to avoid memory leaks
if (process.listenerCount('SIGTERM') === 0) {
  process.on('SIGTERM', () => shutdownPool('SIGTERM'));
}

if (process.listenerCount('SIGINT') === 0) {
  process.on('SIGINT', () => shutdownPool('SIGINT'));
}

if (process.listenerCount('uncaughtException') === 0) {
  process.on('uncaughtException', async (error) => {
    await shutdownPool('uncaughtException', error);
  });
}

if (process.listenerCount('unhandledRejection') === 0) {
  process.on('unhandledRejection', async (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    await shutdownPool('unhandledRejection', error);
  });
}

export { pool };

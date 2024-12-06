import { Pool, QueryResult, QueryResultRow } from 'pg';
import { log } from './logging/log';
import { QueryParams } from './types';

/* eslint-disable no-underscore-dangle */
declare const globalThis: typeof global & {
  _pool?: Pool;
};

const createPool = () =>
  new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

const pool = globalThis._pool ?? createPool();
if (process.env.NODE_ENV !== 'production') globalThis._pool = pool;

// For debugging purposes
// pool.on('connect', () => {
//   log.info(`New PostgreSQL connection at ${new Date().toISOString()}`);
// });

// pool.on('remove', () => {
//   log.info(`PostgreSQL connection removed at ${new Date().toISOString()}`);
// });

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

export async function executeIndependentTransaction(
  queries: Array<{ query: string; values?: string[] }>,
) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await Promise.all(
      queries.map(({ query, values }) => client.query(query, values)),
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    log.error(
      {
        error,
      },
      'Transaction failed during independent queries',
    );
    throw error;
  } finally {
    client.release();
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

process.on('SIGTERM', () => shutdownPool('SIGTERM'));
process.on('SIGINT', () => shutdownPool('SIGINT'));

process.on('uncaughtException', async (error) => {
  await shutdownPool('uncaughtException', error);
});

process.on('unhandledRejection', async (reason) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  await shutdownPool('unhandledRejection', error);
});

export { pool };

import { Pool, QueryResult, QueryResultRow } from "pg";
import { log } from "./log";
import { printException } from "./utils";
import { QueryParams } from "./types";

// Global pool reference
declare const globalThis: typeof global & {
  _pool?: Pool;
};

// Define pool configuration
const createPool = () => {
  return new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    max: 20, // Connection limit
    idleTimeoutMillis: 30000, // Idle connection timeout
    connectionTimeoutMillis: 2000, // Connection attempt timeout
  });
};

// Singleton pool initialization
const pool = globalThis._pool ?? createPool();
if (process.env.NODE_ENV !== "production") globalThis._pool = pool;

// Pool event listeners
pool.on("connect", () => {
  log.info(`New PostgreSQL connection at ${new Date().toISOString()}`);
});

pool.on("remove", () => {
  log.info(`PostgreSQL connection removed at ${new Date().toISOString()}`);
});

pool.on("error", (err) => {
  log.error({
    message: "DB connection error",
    error: err.message,
    stack: err.stack,
  });
});

// Query execution function
export async function executeQuery<T extends QueryResultRow>({
  query,
  values,
}: QueryParams): Promise<QueryResult<T>> {
  try {
    log.info("Executing query...");
    return await pool.query<T>(query, values);
  } catch (error) {
    log.error({
      message: "Query error",
      error: printException(error as Error),
      query,
      values: JSON.stringify(values),
    });
    throw error;
  }
}

// Transaction helper
export async function executeTransaction(
  queries: Array<{ query: string; values?: string[] }>
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const q of queries) {
      await client.query(q.query, q.values);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    log.error({
      message: "Transaction failed",
      error: printException(error as Error),
    });
    throw error;
  } finally {
    client.release();
  }
}

// Graceful shutdown with error handling
async function shutdownPool(signal: string) {
  log.info(`Received ${signal}, shutting down PostgreSQL pool...`);
  try {
    await pool.end();
    log.info("PostgreSQL pool has been closed.");
    process.exit(0);
  } catch (error) {
    log.error({
      message: "Error during PostgreSQL pool shutdown",
      error: (error as Error).message,
    });
    process.exit(1);
  }
}

process.on("SIGTERM", () => shutdownPool("SIGTERM"));
process.on("SIGINT", () => shutdownPool("SIGINT"));

process.on("uncaughtException", async (err) => {
  log.fatal({
    message: "Uncaught Exception",
    error: err.message,
    stack: err.stack,
  });
  await shutdownPool("uncaughtException");
});

process.on("unhandledRejection", async (reason) => {
  if (reason instanceof Error) {
    log.fatal({
      message: "Unhandled Rejection",
      error: reason.message,
      stack: reason.stack,
    });
  } else {
    log.fatal({
      message: "Unhandled Rejection",
      error: String(reason),
    });
  }
  await shutdownPool("unhandledRejection");
});

export { pool };

// Database connection and queries
import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'agent_discovery',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test the connection
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

/**
 * Executes a database query with parameters
 * @param text - The SQL query text
 * @param params - The query parameters
 * @returns The query result
 */
export async function query(text: string, params?: unknown[]) {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

/**
 * Gets a client from the pool for transactions
 * @returns A client from the pool
 */
export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  // Monkey patch the query method to keep track of queries
  client.query = (...args: unknown[]) => {
    client.lastQuery = args[0];
    return query.apply(client, args);
  };

  // Monkey patch the release method to log queries
  client.release = () => {
    client.query = query;
    client.release = release;
    return release.apply(client);
  };

  return client;
}

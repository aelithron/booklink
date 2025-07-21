import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 10,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 2000,
});
const db = drizzle(pool);
export default db;
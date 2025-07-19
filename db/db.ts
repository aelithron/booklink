import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const dbURL = process.env.DATABASE_URL;
if (!dbURL) {
  throw new Error("No database URL provided in environment variables! Please set the `DATABASE_URL` value to a PostgreSQL connection string.");
}
const db = drizzle(dbURL);
export default db;
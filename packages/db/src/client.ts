import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const queryClient = postgres(databaseUrl, {
  max: 10,
  family: 4,          // forza IPv4
  ssl: 'require',     // Supabase richiede SSL
});

export const db = drizzle(queryClient);
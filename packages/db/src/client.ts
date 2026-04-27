import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@repo/config/env";

const queryClient = postgres(env.DATABASE_URL, { max: 10 });
export const db = drizzle(queryClient);
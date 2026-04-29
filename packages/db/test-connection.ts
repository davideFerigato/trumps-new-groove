import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}
const sql = postgres(databaseUrl);
async function main() {
  const result = await sql`SELECT 1 AS connected`;
  console.log("✅ Connessione OK:", result);
  await sql.end();
}
main().catch(console.error);

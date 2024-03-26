import type { Config } from "drizzle-kit";

const POSTGRES_CONNECTION_STRING = process.env.POSTGRES_CONNECTION_STRING;
if (!POSTGRES_CONNECTION_STRING) {
  throw new Error("POSTGRES_CONNECTION_STRING is not defined");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_CONNECTION_STRING!,
  },
} satisfies Config;

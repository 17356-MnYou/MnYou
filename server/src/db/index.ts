import { drizzle } from "drizzle-orm/postgres-js";
import * as dotenv from "dotenv";
import postgres from "postgres";

dotenv.config();

const POSTGRES_CONNECTION_STRING = process.env.POSTGRES_CONNECTION_STRING;
if (!POSTGRES_CONNECTION_STRING) {
  throw new Error("POSTGRES_CONNECTION_STRING is not defined");
}

const client = postgres(POSTGRES_CONNECTION_STRING);
export const db = drizzle(client);

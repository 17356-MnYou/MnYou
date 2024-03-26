import { varchar, pgTable, serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: varchar("password_hash", { length: 256 }).notNull(),
});

import { text } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { real } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { varchar, pgTable, serial } from "drizzle-orm/pg-core";

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: varchar("password_hash", { length: 256 }).notNull(),
});

export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  primaryFont: text("primary_font"),
  secondaryFont: text("secondary_font"),
  primaryFontColor: text("primary_font_color"),
  secondaryFontColor: text("secondary_font_color"),
  backgroundColor: text("background_color"),
  orientation: integer("orientation"),
  name: text("name"),
  address: text("address"),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  title: text("title"),
  secondaryTitle: text("secondary_title"),
  image: text("image"),
  price: real("price"),
  description: text("description"),
  isActive: boolean("is_active"),
});

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name"),
  image: text("image"),
});

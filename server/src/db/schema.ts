import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { real } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { varchar, pgTable, serial } from "drizzle-orm/pg-core";

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name"),
  address: text("address"),
  phoneNumber: text("phone_number"),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: varchar("password_hash", { length: 256 }).notNull(),
  menu: integer("menu").references(() => menus.id),
});

export const restaurantRelations = relations(restaurants, ({ one }) => ({
  menu: one(menus, {
    fields: [restaurants.menu],
    references: [menus.id],
  }),
}));

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

export const menuRelations = relations(menus, ({ many }) => ({
  menuItems: many(menuItems),
}));

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  title: text("title"),
  secondaryTitle: text("secondary_title"),
  image: text("image"),
  price: real("price"),
  description: text("description"),
  isActive: boolean("is_active"),
  menu: integer("menu").references(() => menus.id),
  section: integer("section").references(() => sections.id),
});

export const menuItemRelations = relations(menuItems, ({ one, many }) => ({
  menu: one(menus, {
    fields: [menuItems.menu],
    references: [menus.id],
  }),
  section: one(sections, {
    fields: [menuItems.section],
    references: [sections.id],
  }),
  ingredients: many(ingredients),
}));

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  name: text("name"),
  menu: integer("menu").references(() => menus.id),
});

export const sectionRelations = relations(sections, ({ one, many }) => ({
  menuItems: many(menuItems),
  menu: one(menus, {
    fields: [sections.menu],
    references: [menus.id],
  }),
}));

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name"),
  image: text("image"),
});

export const ingredientRelations = relations(ingredients, ({ many }) => ({
  menuItems: many(menuItems),
}));

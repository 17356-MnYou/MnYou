"use strict";
exports.__esModule = true;
exports.ingredientRelations = exports.ingredients = exports.menu_item_ingredients = exports.sectionRelations = exports.sections = exports.menuItemRelations = exports.menuItems = exports.menuRelations = exports.menus = exports.restaurantRelations = exports.restaurants = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
var pg_core_2 = require("drizzle-orm/pg-core");
var pg_core_3 = require("drizzle-orm/pg-core");
var pg_core_4 = require("drizzle-orm/pg-core");
var pg_core_5 = require("drizzle-orm/pg-core");
var bytea = pg_core_1.customType({
    dataType: function () {
        return "bytea";
    }
});
exports.restaurants = pg_core_5.pgTable("restaurants", {
    id: pg_core_5.serial("id").primaryKey(),
    name: pg_core_1.text("name"),
    address: pg_core_1.text("address"),
    phoneNumber: pg_core_1.text("phone_number"),
    username: pg_core_5.varchar("username", { length: 256 }).notNull().unique(),
    password: pg_core_5.varchar("password_hash", { length: 256 }).notNull(),
    menu: pg_core_4.integer("menu").references(function () { return exports.menus.id; })
});
exports.restaurantRelations = drizzle_orm_1.relations(exports.restaurants, function (_a) {
    var one = _a.one;
    return ({
        menu: one(exports.menus, {
            fields: [exports.restaurants.menu],
            references: [exports.menus.id]
        })
    });
});
exports.menus = pg_core_5.pgTable("menus", {
    id: pg_core_5.serial("id").primaryKey(),
    primaryFont: pg_core_1.text("primary_font"),
    secondaryFont: pg_core_1.text("secondary_font"),
    primaryFontColor: pg_core_1.text("primary_font_color"),
    secondaryFontColor: pg_core_1.text("secondary_font_color"),
    backgroundColor: pg_core_1.text("background_color"),
    orientation: pg_core_4.integer("orientation"),
    name: pg_core_1.text("name"),
    address: pg_core_1.text("address")
});
exports.menuRelations = drizzle_orm_1.relations(exports.menus, function (_a) {
    var many = _a.many;
    return ({
        menuItems: many(exports.menuItems)
    });
});
exports.menuItems = pg_core_5.pgTable("menu_items", {
    id: pg_core_5.serial("id").primaryKey(),
    title: pg_core_1.text("title"),
    secondaryTitle: pg_core_1.text("secondary_title"),
    image: bytea("image"),
    price: pg_core_3.real("price"),
    description: pg_core_1.text("description"),
    isActive: pg_core_2.boolean("is_active").notNull(),
    menu: pg_core_4.integer("menu")
        .references(function () { return exports.menus.id; })
        .notNull(),
    section: pg_core_4.integer("section")
        .references(function () { return exports.sections.id; })
        .notNull()
});
exports.menuItemRelations = drizzle_orm_1.relations(exports.menuItems, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        menu: one(exports.menus, {
            fields: [exports.menuItems.menu],
            references: [exports.menus.id]
        }),
        section: one(exports.sections, {
            fields: [exports.menuItems.section],
            references: [exports.sections.id]
        }),
        ingredients: many(exports.ingredients)
    });
});
exports.sections = pg_core_5.pgTable("sections", {
    id: pg_core_5.serial("id").primaryKey(),
    name: pg_core_1.text("name"),
    menu: pg_core_4.integer("menu").references(function () { return exports.menus.id; })
});
exports.sectionRelations = drizzle_orm_1.relations(exports.sections, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        menuItems: many(exports.menuItems),
        menu: one(exports.menus, {
            fields: [exports.sections.menu],
            references: [exports.menus.id]
        })
    });
});
exports.menu_item_ingredients = pg_core_5.pgTable("menu_item_ingredients", {
    menuItemId: pg_core_4.integer("menu_item_id")
        .references(function () { return exports.menuItems.id; }),
    ingredientId: pg_core_4.integer("ingredient_id")
        .references(function () { return exports.ingredients.id; })
});
exports.ingredients = pg_core_5.pgTable("ingredients", {
    id: pg_core_5.serial("id").primaryKey(),
    name: pg_core_1.text("name"),
    image: bytea("image")
});
exports.ingredientRelations = drizzle_orm_1.relations(exports.ingredients, function (_a) {
    var many = _a.many;
    return ({
        menuItems: many(exports.menuItems)
    });
});

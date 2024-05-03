"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var db_1 = require("../../db");
var schema_1 = require("../../db/schema");
var drizzle_orm_1 = require("drizzle-orm");
var multer_1 = require("multer");
var router = express_1["default"].Router();
var upload = multer_1["default"]();
// CREATE
router.post("/", upload.none(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var menuData, menu, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuData = req.body;
                if (!menuData ||
                    !menuData.primary_font ||
                    !menuData.secondary_font ||
                    !menuData.primary_font_color ||
                    !menuData.secondary_font_color ||
                    !menuData.background_color ||
                    !menuData.orientation ||
                    !menuData.name ||
                    !menuData.address) {
                    return [2 /*return*/, res.status(500).send("Invalid menu data")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db
                        .insert(schema_1.menus)
                        .values({
                        primaryFont: menuData.primary_font,
                        secondaryFont: menuData.secondary_font,
                        primaryFontColor: menuData.primary_font_color,
                        secondaryFontColor: menuData.secondary_font_color,
                        backgroundColor: menuData.background_color,
                        orientation: menuData.orientation,
                        name: menuData.name,
                        address: menuData.address
                    })
                        .returning()];
            case 2:
                menu = _a.sent();
                // return the inserted menu so that the front end can store the menu id somewhere after
                // creating a new menu
                // NOTE: again there are better methods of doing this, but this is the easiest way of data
                // management between front and back end
                return [2 /*return*/, res.status(200).send(menu)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/:id", upload.single("file"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var menuItemData, imageFile, menuItem, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuItemData = req.body;
                if (!menuItemData) {
                    return [2 /*return*/, res.status(400).send("Invalid JSON data")];
                }
                if (!menuItemData.title ||
                    !menuItemData.secondaryTitle ||
                    !menuItemData.price ||
                    !menuItemData.description ||
                    !menuItemData.isActive ||
                    !menuItemData.menu ||
                    !menuItemData.section) {
                    return [2 /*return*/, res
                            .status(400)
                            .send("Not enough information to create a menu item")];
                }
                imageFile = req.file ? req.file.buffer : null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db
                        .insert(schema_1.menuItems)
                        .values({
                        title: menuItemData.title,
                        secondaryTitle: menuItemData.secondaryTitle,
                        image: imageFile,
                        price: menuItemData.price,
                        description: menuItemData.description,
                        isActive: menuItemData.isActive,
                        menu: menuItemData.menu,
                        section: menuItemData.section
                    })
                        .returning()];
            case 2:
                menuItem = _a.sent();
                return [2 /*return*/, res.status(200).send(menuItem)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_2)];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Helpers for read operations
function getMenu(menuId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1.db.select().from(schema_1.menus).where(drizzle_orm_1.eq(schema_1.menus.id, menuId))];
        });
    });
}
function getMenuItems(menuId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1.db
                    .select()
                    .from(schema_1.menuItems)
                    .where(drizzle_orm_1.eq(schema_1.menuItems.menu, menuId))
                    .orderBy(drizzle_orm_1.asc(schema_1.menuItems.section))];
        });
    });
}
function getSpecificMenuItem(menuId, itemId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1.db
                    .select()
                    .from(schema_1.menuItems)
                    .where(drizzle_orm_1.eq(schema_1.menuItems.menu, menuId) && drizzle_orm_1.eq(schema_1.menuItems.id, itemId))];
        });
    });
}
function getAllSections(menuId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1.db.select().from(schema_1.sections).where(drizzle_orm_1.eq(schema_1.sections.menu, menuId))];
        });
    });
}
function getMenuItemsBySection(menuId, sectionId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1.db
                    .select()
                    .from(schema_1.menuItems)
                    .where(drizzle_orm_1.eq(schema_1.menuItems.menu, menuId) && drizzle_orm_1.eq(schema_1.menuItems.section, sectionId))];
        });
    });
}
// SELECT name, image
// FROM ingredients
// LEFT JOIN menu_item_ingredients
//   ON ingredient_id = id
// WHERE menu_item_id = 3
function getIngredientsByMenuItem(menuItemId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1.db
                    .select({ name: schema_1.ingredients.name, image: schema_1.ingredients.image })
                    .from(schema_1.ingredients)
                    .leftJoin(schema_1.menu_item_ingredients, drizzle_orm_1.eq(schema_1.menu_item_ingredients.ingredientId, schema_1.ingredients.id))
                    .where(drizzle_orm_1.eq(schema_1.menu_item_ingredients.menuItemId, menuItemId))];
        });
    });
}
// READ
// Can only receive the data from 1 menu at a time, shouldnt be able to read all menus.
// Ex: http://localhost:3000/api/menus/1
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var menuId, menu, sections, organizedItems, _i, sections_1, section, items, section_name, itemsWithIngredients, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuId = Number(req.params.id);
                if (!menuId)
                    return [2 /*return*/, res.status(500).send("Invalid menu")];
                return [4 /*yield*/, getMenu(menuId)];
            case 1:
                menu = (_a.sent())[0];
                if (!menu)
                    return [2 /*return*/, res.status(404).send("No menu found")];
                return [4 /*yield*/, getAllSections(menuId)];
            case 2:
                sections = _a.sent();
                if (!sections)
                    return [2 /*return*/, res.status(500).send("No sections found")];
                organizedItems = [];
                _i = 0, sections_1 = sections;
                _a.label = 3;
            case 3:
                if (!(_i < sections_1.length)) return [3 /*break*/, 7];
                section = sections_1[_i];
                return [4 /*yield*/, getMenuItemsBySection(menuId, section.id)];
            case 4:
                items = _a.sent();
                section_name = section.name;
                return [4 /*yield*/, Promise.all(items.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var itemIngredients;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getIngredientsByMenuItem(item.id)];
                                case 1:
                                    itemIngredients = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, item), { ingredients: itemIngredients })];
                            }
                        });
                    }); }))];
            case 5:
                itemsWithIngredients = _a.sent();
                organizedItems.push({ section_name: section_name, items: itemsWithIngredients });
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7:
                response = {
                    id: menu.id,
                    primaryFont: menu.primaryFont,
                    secondaryFont: menu.secondaryFont,
                    primaryFontColor: menu.primaryFontColor,
                    secondaryFontColor: menu.secondaryFontColor,
                    backgroundColor: menu.backgroundColor,
                    orientation: menu.orientation,
                    name: menu.name,
                    address: menu.address
                };
                return [2 /*return*/, res.status(200).json(__assign(__assign({}, response), { organizedItems: organizedItems }))];
        }
    });
}); });
// Returns a specific menu item given a menu id and item id
// Ex: http://localhost:3000/api/menus/1/2
router.get("/:mid/:iid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var menuId, itemId, menu_item, ing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuId = Number(req.params.mid);
                itemId = Number(req.params.iid);
                if (!menuId || !itemId)
                    return [2 /*return*/, res.status(500).send("Invalid menu or item")];
                return [4 /*yield*/, getSpecificMenuItem(menuId, itemId)];
            case 1:
                menu_item = _a.sent();
                if (!menu_item)
                    return [2 /*return*/, res.status(500).send("No menu item found")];
                return [4 /*yield*/, getIngredientsByMenuItem(itemId)];
            case 2:
                ing = _a.sent();
                return [2 /*return*/, res.status(200).json(__assign(__assign({}, menu_item), { ing: ing }))];
        }
    });
}); });
router.patch("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, menuData, updatedFields, validFields, _i, validFields_1, field, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                menuData = req.body;
                updatedFields = {};
                validFields = ['primaryFont', 'secondaryFont', 'primaryFontColor', 'secondaryFontColor', 'backgroundColor', 'orientation', 'name', 'address'];
                for (_i = 0, validFields_1 = validFields; _i < validFields_1.length; _i++) {
                    field = validFields_1[_i];
                    if (field in menuData) {
                        updatedFields[field] = menuData[field];
                    }
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.update(schema_1.menus)
                        .set(updatedFields)
                        .where(drizzle_orm_1.eq(schema_1.menus.id, id))];
            case 2:
                _a.sent();
                res.status(200).send("Menu updated successfully");
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).send("Failed to update menu");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.patch("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, menuData, updatedFields, validFields, _i, validFields_2, field, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                menuData = req.body;
                updatedFields = {};
                validFields = ['primaryFont', 'secondaryFont', 'primaryFontColor', 'secondaryFontColor', 'backgroundColor', 'orientation', 'name', 'address'];
                for (_i = 0, validFields_2 = validFields; _i < validFields_2.length; _i++) {
                    field = validFields_2[_i];
                    if (field in menuData) {
                        updatedFields[field] = menuData[field];
                    }
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.update(schema_1.menus)
                        .set(updatedFields)
                        .where(drizzle_orm_1.eq(schema_1.menus.id, id))];
            case 2:
                _a.sent();
                res.status(200).send("Menu updated successfully");
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).send("Failed to update menu");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;

"use strict";
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
var router = express_1["default"].Router();
// CREATE
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                restaurantData = req.body;
                if (!restaurantData || !restaurantData.username || !restaurantData.password) {
                    // Send a clear error message back to the client
                    return [2 /*return*/, res.status(400).json({ message: "Invalid restaurant data, username and password are required." })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.insert(schema_1.restaurants).values({
                        name: restaurantData.name,
                        address: restaurantData.address,
                        phoneNumber: restaurantData.phoneNumber,
                        username: restaurantData.username,
                        password: restaurantData.password
                    })];
            case 2:
                _a.sent();
                // Properly end the request after successful insertion
                return [2 /*return*/, res.status(201).json({ message: "Restaurant data saved successfully." })];
            case 3:
                error_1 = _a.sent();
                // Send the error as a JSON response
                return [2 /*return*/, res.status(500).json({ message: "Failed to save restaurant data", error: error_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// READ
router.get("/", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.restaurants)];
            case 1:
                restaurantList = _a.sent();
                return [2 /*return*/, res.status(200).json(restaurantList)];
        }
    });
}); });
router.get("/:username", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantUsername, restaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                restaurantUsername = req.params.username;
                if (!restaurantUsername) {
                    return [2 /*return*/, res.status(500).send("Invalid username")];
                }
                return [4 /*yield*/, db_1.db
                        .select()
                        .from(schema_1.restaurants)
                        .where(drizzle_orm_1.eq(schema_1.restaurants.username, restaurantUsername))];
            case 1:
                restaurant = (_a.sent())[0];
                if (!restaurant) {
                    return [2 /*return*/, res.status(500).send("No restaurant found")];
                }
                return [2 /*return*/, res.status(200).json(restaurant)];
        }
    });
}); });
// UPDATE
router.put("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantData, updatedData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                restaurantData = req.body;
                if (!restaurantData) {
                    return [2 /*return*/, res.status(500).send("Invalid restaurant data")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                updatedData = new Map();
                if (restaurantData.username) {
                    updatedData.set("username", restaurantData.username);
                }
                if (restaurantData.password) {
                    updatedData.set("password", restaurantData.password);
                }
                if (restaurantData.menu) {
                    updatedData.set("menu", restaurantData.menu);
                }
                return [4 /*yield*/, db_1.db.update(schema_1.restaurants).set(Object.fromEntries(updatedData))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_2)];
            case 4: return [2 /*return*/, res.status(200)];
        }
    });
}); });
// DELETE
router["delete"]("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantId, deletedRestaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                restaurantId = Number(req.params.id);
                if (!restaurantId) {
                    return [2 /*return*/, res.status(500).send("Invalid username")];
                }
                return [4 /*yield*/, db_1.db["delete"](schema_1.restaurants)
                        .where(drizzle_orm_1.eq(schema_1.restaurants.id, restaurantId))
                        .returning()];
            case 1:
                deletedRestaurant = (_a.sent())[0];
                return [2 /*return*/, res.status(200).json(deletedRestaurant)];
        }
    });
}); });
exports["default"] = router;

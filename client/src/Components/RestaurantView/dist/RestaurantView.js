"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Navbar_1 = require("../Navbar");
var Menu_1 = require("./Menu");
var MenuForm_1 = require("./MenuForm");
var react_qr_code_1 = require("react-qr-code");
require("./RestaurantView.css");
var RestaurantView = function () {
  var _a = react_1.useState([]),
    menus = _a[0],
    setMenus = _a[1];
  var _b = react_1.useState(null),
    selectedMenu = _b[0],
    setSelectedMenu = _b[1];
  var _c = react_1.useState(null),
    newMenu = _c[0],
    setNewMenu = _c[1];
  react_1.useEffect(function () {
    var fetchMenus = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              return [
                4 /*yield*/,
                fetch(`${process.env.API_ENDPOINT}/api/restaurants`),
              ];
            case 1:
              response = _a.sent();
              return [4 /*yield*/, response.json()];
            case 2:
              data = _a.sent();
              console.log(data);
              setMenus(data);
              return [3 /*break*/, 4];
            case 3:
              error_1 = _a.sent();
              console.error("Failed to fetch menus:", error_1);
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    fetchMenus();
  }, []);
  var handleAddMenuClick = function () {
    setNewMenu({
      id: menus.length + 1,
      username: "example@gmail.com",
      password: "secret",
      name: "",
      address: "",
      phoneNumber: "",
      primaryFont: "",
      secondaryFont: "",
      primaryFontColor: "",
      secondaryFontColor: "",
      backgroundColor: "",
      orientation: 0,
      organizedItems: [],
    });
  };
  var handleMenuClick = function (menu_id) {
    return __awaiter(void 0, void 0, void 0, function () {
      var response, menu_data, convertedMenu, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, , 4]);
            return [
              4 /*yield*/,
              fetch(`${process.env.API_ENDPOINT}/api/menus/` + menu_id),
            ];
          case 1:
            response = _a.sent();
            if (!response.ok)
              throw new Error(
                "Failed to fetch menu details: " + response.statusText,
              );
            return [4 /*yield*/, response.json()];
          case 2:
            menu_data = _a.sent();
            console.log(menu_data);
            setMenus(menu_data);
            if (Array.isArray(menu_data.organizedItems)) {
              convertedMenu = __assign(__assign({}, menu_data), {
                organizedItems: menu_data.organizedItems.map(
                  function (section) {
                    return __assign(__assign({}, section), {
                      items: section.items.map(function (item) {
                        return __assign(__assign({}, item), {
                          price: parseFloat(item.price),
                        });
                      }),
                    });
                  },
                ),
              });
              setSelectedMenu(convertedMenu);
            } else {
              console.error(
                "menu_data.organizedItems is not an array:",
                menu_data.organizedItems,
              );
            }
            return [3 /*break*/, 4];
          case 3:
            error_2 = _a.sent();
            console.error(error_2.message || "Failed to fetch menu details");
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleInputChange = function (event) {
    var _a = event.target,
      name = _a.name,
      value = _a.value;
    setNewMenu(function (prevState) {
      var _a;
      return prevState
        ? __assign(__assign({}, prevState), ((_a = {}), (_a[name] = value), _a))
        : null;
    });
  };
  var handleFormSubmit = function (event) {
    event.preventDefault();
    // Add the new menu to your backend when available
    setNewMenu(null);
  };
  var handleDelete = function (menu_id) {
    return function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var confirmDelete, response, error_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              confirmDelete = window.confirm(
                "Are you sure you want to delete this menu?",
              );
              if (!confirmDelete) return [3 /*break*/, 5];
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                fetch(
                  `${process.env.API_ENDPOINT}/api/restaurants/` + menu_id,
                  {
                    method: "DELETE",
                  },
                ),
              ];
            case 2:
              response = _a.sent();
              if (!response.ok)
                throw new Error(
                  "Failed to delete menu: " + response.statusText,
                );
              // Update state to remove the menu from the list
              setMenus(
                menus.filter(function (menu) {
                  return menu.id !== menu_id;
                }),
              );
              alert("Menu deleted successfully.");
              return [3 /*break*/, 4];
            case 3:
              error_3 = _a.sent();
              console.error(error_3.message || "Failed to delete menu");
              alert("Failed to delete menu.");
              return [3 /*break*/, 4];
            case 4:
              return [3 /*break*/, 6];
            case 5:
              console.log("Deletion cancelled by user.");
              _a.label = 6;
            case 6:
              return [2 /*return*/];
          }
        });
      });
    };
  };
  return react_1["default"].createElement(
    "div",
    null,
    react_1["default"].createElement(Navbar_1["default"], null),
    selectedMenu
      ? react_1["default"].createElement(
          "div",
          null,
          react_1["default"].createElement(
            Menu_1["default"],
            __assign({}, selectedMenu),
          ),
          react_1["default"].createElement(
            react_bootstrap_1.Button,
            {
              className: "Button",
              onClick: function () {
                return setSelectedMenu(null);
              },
            },
            "Back to list",
          ),
        )
      : newMenu
        ? react_1["default"].createElement(MenuForm_1["default"], null)
        : react_1["default"].createElement(
            "div",
            null,
            react_1["default"].createElement(
              react_bootstrap_1.Table,
              {
                className: "Table",
                striped: true,
                bordered: true,
                hover: true,
              },
              react_1["default"].createElement(
                "thead",
                null,
                react_1["default"].createElement(
                  "tr",
                  null,
                  react_1["default"].createElement("th", null, "Id"),
                  react_1["default"].createElement("th", null, "Name"),
                  react_1["default"].createElement("th", null, "Address"),
                  react_1["default"].createElement("th", null, "Phone Number"),
                  react_1["default"].createElement("th", null, "Username"),
                  react_1["default"].createElement("th", null, "Password"),
                  react_1["default"].createElement("th", null, "QR Code"),
                  react_1["default"].createElement("th", null, "View Menu"),
                  react_1["default"].createElement("th", null, "Delete"),
                ),
              ),
              react_1["default"].createElement(
                "tbody",
                null,
                menus.map(function (menu) {
                  return react_1["default"].createElement(
                    "tr",
                    { key: menu.id },
                    "  ",
                    react_1["default"].createElement("td", null, menu.id),
                    react_1["default"].createElement("td", null, menu.name),
                    react_1["default"].createElement("td", null, menu.address),
                    react_1["default"].createElement(
                      "td",
                      null,
                      menu.phoneNumber,
                    ),
                    react_1["default"].createElement("td", null, menu.username),
                    react_1["default"].createElement("td", null, menu.password),
                    react_1["default"].createElement(
                      "td",
                      null,
                      react_1["default"].createElement(
                        react_qr_code_1["default"],
                        {
                          id: "qr" + menu.id,
                          value:
                            `${process.env.API_ENDPOINT}/restaurant/` + menu.id,
                          size: 128,
                          level: "H",
                        },
                      ),
                    ),
                    react_1["default"].createElement(
                      "td",
                      null,
                      react_1["default"].createElement(
                        react_bootstrap_1.Button,
                        {
                          className: "view-menu-button",
                          onClick: function () {
                            return handleMenuClick(menu.id);
                          },
                        },
                        "View Menu",
                      ),
                    ),
                    react_1["default"].createElement(
                      "td",
                      null,
                      react_1["default"].createElement("img", {
                        src: "/trash.png",
                        width: "60",
                        height: "60",
                        alt: "MnYou logo",
                        className: "clickable-image",
                        onClick: handleDelete(menu.id),
                      }),
                    ),
                  );
                }),
              ),
            ),
            react_1["default"].createElement(
              react_bootstrap_1.Button,
              { className: "Button", onClick: handleAddMenuClick },
              "Add New Restaurant",
            ),
          ),
  );
};
exports["default"] = RestaurantView;

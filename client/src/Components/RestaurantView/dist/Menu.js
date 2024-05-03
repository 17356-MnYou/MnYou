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
var CustomerView_1 = require("../CustomerView/CustomerView");
var react_router_dom_1 = require("react-router-dom");
require("./Menu.css");
var Menu = function (_a) {
  var id = _a.id,
    primaryFont = _a.primaryFont,
    secondaryFont = _a.secondaryFont,
    primaryFontColor = _a.primaryFontColor,
    secondaryFontColor = _a.secondaryFontColor,
    backgroundColor = _a.backgroundColor,
    orientation = _a.orientation,
    name = _a.name,
    address = _a.address,
    organizedItems = _a.organizedItems;
  var _b = react_1.useState(null),
    editedMenuItem = _b[0],
    setEditedMenuItem = _b[1];
  var _c = react_1.useState(
      localStorage.getItem("backgroundColor-" + id) || backgroundColor,
    ),
    color = _c[0],
    setColor = _c[1];
  var _d = react_1.useState(
      localStorage.getItem("primaryFont-" + id) || primaryFont,
    ),
    font = _d[0],
    setFont = _d[1];
  var _e = react_1.useState(
      localStorage.getItem("secondaryFont-" + id) || secondaryFont,
    ),
    secondaryFontState = _e[0],
    setSecondaryFont = _e[1];
  var _f = react_1.useState(
      localStorage.getItem("primaryFontColor-" + id) || primaryFontColor,
    ),
    primaryFontColorState = _f[0],
    setPrimaryFontColor = _f[1];
  var _g = react_1.useState(
      localStorage.getItem("secondaryFontColor-" + id) || secondaryFontColor,
    ),
    secondaryFontColorState = _g[0],
    setSecondaryFontColor = _g[1];
  var _h = react_1.useState(
      localStorage.getItem("orientation-" + id)
        ? Number(localStorage.getItem("orientation-" + id))
        : orientation,
    ),
    orientationState = _h[0],
    setOrientation = _h[1];
  var _j = react_1.useState(localStorage.getItem("name-" + id) || name),
    nameState = _j[0],
    setName = _j[1];
  var _k = react_1.useState(localStorage.getItem("address-" + id) || address),
    addressState = _k[0],
    setAddress = _k[1];
  var handleEditClick = function (menuItem) {
    setEditedMenuItem(menuItem);
  };
  var handleInputChange = function (event) {
    var _a = event.target,
      name = _a.name,
      value = _a.value;
    setEditedMenuItem(function (prevState) {
      var _a;
      return __assign(
        __assign({}, prevState),
        ((_a = {}),
        (_a[name] = name === "price" ? parseFloat(value) : value),
        _a),
      );
    });
  };
  var handleFormSubmit = function (event) {
    event.preventDefault();
    console.log("Submit:", editedMenuItem);
    // Placeholder for backend update logic
    setEditedMenuItem(null);
  };
  var handleCancel = function () {
    setEditedMenuItem(null);
  };
  var handleAddClick = function () {
    var newItem = {
      id: Date.now(),
      title: "",
      secondaryTitle: "",
      image: "",
      price: 0,
      description: "",
      isActive: true,
      menu: id,
      section: 1,
    };
    setEditedMenuItem(newItem);
  };
  var menuId = react_router_dom_1.useParams().menuId;
  var handleSaveSettings = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var response, _a, _b, _c;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            return [
              4 /*yield*/,
              fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/menus/` + id, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  primaryFont: font,
                  secondaryFont: secondaryFontState,
                  primaryFontColor: primaryFontColorState,
                  secondaryFontColor: secondaryFontColorState,
                  backgroundColor: color,
                  orientation: orientationState,
                  name: nameState,
                  address: addressState,
                }),
              }),
            ];
          case 1:
            response = _d.sent();
            if (!response.ok) return [3 /*break*/, 2];
            localStorage.setItem("backgroundColor-" + id, color);
            localStorage.setItem("primaryFont-" + id, font);
            localStorage.setItem("secondaryFont-" + id, secondaryFontState);
            localStorage.setItem(
              "primaryFontColor-" + id,
              primaryFontColorState,
            );
            localStorage.setItem(
              "secondaryFontColor-" + id,
              secondaryFontColorState,
            );
            localStorage.setItem(
              "orientation-" + id,
              orientationState.toString(),
            );
            localStorage.setItem("name-" + id, nameState);
            localStorage.setItem("address-" + id, addressState);
            // Update the state to reflect the new settings
            setFont(font);
            setSecondaryFont(secondaryFontState);
            setPrimaryFontColor(primaryFontColorState);
            setSecondaryFontColor(secondaryFontColorState);
            setColor(color);
            setOrientation(orientationState);
            setName(nameState);
            setAddress(addressState);
            alert("Settings saved successfully!");
            return [3 /*break*/, 4];
          case 2:
            _b = (_a = console).error;
            _c = ["Failed to save settings:"];
            return [4 /*yield*/, response.text()];
          case 3:
            _b.apply(_a, _c.concat([_d.sent()]));
            _d.label = 4;
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return react_1["default"].createElement(
    "div",
    { className: "container" },
    react_1["default"].createElement("h2", null, name),
    react_1["default"].createElement("p", null, address),
    react_1["default"].createElement(
      "div",
      { className: "Menu" },
      react_1["default"].createElement(
        "div",
        { className: "View" },
        react_1["default"].createElement(
          "h2",
          { className: "customerView" },
          "Customer View",
        ),
        react_1["default"].createElement(
          "div",
          { className: "customer-view-container" },
          react_1["default"].createElement(CustomerView_1["default"], {
            menuId: menuId ? Number(menuId) : undefined,
            primaryFont: font,
            secondaryFont: secondaryFontState,
            primaryFontColor: primaryFontColorState,
            secondaryFontColor: secondaryFontColorState,
            backgroundColor: color,
            orientation: orientationState,
            name: nameState,
            address: addressState,
          }),
        ),
      ),
      react_1["default"].createElement(
        "div",
        { className: "settings-and-view-container" },
        react_1["default"].createElement(
          "div",
          { className: "settings" },
          react_1["default"].createElement("h2", null, "Settings"),
          react_1["default"].createElement(
            "label",
            null,
            "Name:",
            react_1["default"].createElement("input", {
              type: "text",
              value: nameState,
              onChange: function (e) {
                return setName(e.target.value);
              },
            }),
          ),
          react_1["default"].createElement(
            "label",
            null,
            "Address:",
            react_1["default"].createElement("input", {
              type: "text",
              value: addressState,
              onChange: function (e) {
                return setAddress(e.target.value);
              },
            }),
          ),
          react_1["default"].createElement(
            "label",
            null,
            "Primary Font:",
            react_1["default"].createElement(
              "select",
              {
                value: font,
                onChange: function (e) {
                  return setFont(e.target.value);
                },
              },
              react_1["default"].createElement(
                "option",
                { value: "Arial" },
                "Arial",
              ),
              react_1["default"].createElement(
                "option",
                { value: "Verdana" },
                "Verdana",
              ),
              react_1["default"].createElement(
                "option",
                { value: "Courier New" },
                "Courier New",
              ),
            ),
          ),
          react_1["default"].createElement(
            "label",
            null,
            "Secondary Font:",
            react_1["default"].createElement(
              "select",
              {
                value: secondaryFontState,
                onChange: function (e) {
                  return setSecondaryFont(e.target.value);
                },
              },
              react_1["default"].createElement(
                "option",
                { value: "Arial" },
                "Arial",
              ),
              react_1["default"].createElement(
                "option",
                { value: "Verdana" },
                "Verdana",
              ),
              react_1["default"].createElement(
                "option",
                { value: "Courier New" },
                "Courier New",
              ),
            ),
          ),
          react_1["default"].createElement(
            "label",
            null,
            "Primary Font Color:",
            react_1["default"].createElement("input", {
              type: "color",
              value: primaryFontColorState,
              onChange: function (e) {
                return setPrimaryFontColor(e.target.value);
              },
            }),
          ),
          react_1["default"].createElement(
            "label",
            null,
            "Secondary Font Color:",
            react_1["default"].createElement("input", {
              type: "color",
              value: secondaryFontColorState,
              onChange: function (e) {
                return setSecondaryFontColor(e.target.value);
              },
            }),
          ),
          react_1["default"].createElement(
            "label",
            null,
            "Background Color:",
            react_1["default"].createElement("input", {
              type: "color",
              value: color,
              onChange: function (e) {
                return setColor(e.target.value);
              },
            }),
          ),
          react_1["default"].createElement(
            "label",
            null,
            "Orientation:",
            react_1["default"].createElement("input", {
              type: "number",
              value: orientationState,
              onChange: function (e) {
                return setOrientation(Number(e.target.value));
              },
            }),
          ),
          react_1["default"].createElement(
            "div",
            { className: "save-settings-button-container" },
            react_1["default"].createElement(
              react_bootstrap_1.Button,
              { className: "Button", onClick: handleSaveSettings },
              "Save Settings",
            ),
          ),
        ),
      ),
    ),
    editedMenuItem
      ? react_1["default"].createElement(
          react_bootstrap_1.Form,
          { onSubmit: handleFormSubmit },
          react_1["default"].createElement(
            react_bootstrap_1.Form.Group,
            null,
            react_1["default"].createElement(
              react_bootstrap_1.Form.Label,
              null,
              "Name",
            ),
            react_1["default"].createElement(react_bootstrap_1.Form.Control, {
              type: "text",
              name: "title",
              value: editedMenuItem.title,
              onChange: handleInputChange,
              required: true,
            }),
          ),
          react_1["default"].createElement(
            react_bootstrap_1.Form.Group,
            null,
            react_1["default"].createElement(
              react_bootstrap_1.Form.Label,
              null,
              "Description",
            ),
            react_1["default"].createElement(react_bootstrap_1.Form.Control, {
              type: "text",
              name: "description",
              value: editedMenuItem.description,
              onChange: handleInputChange,
              required: true,
            }),
          ),
          react_1["default"].createElement(
            react_bootstrap_1.Form.Group,
            null,
            react_1["default"].createElement(
              react_bootstrap_1.Form.Label,
              null,
              "Image",
            ),
            react_1["default"].createElement(react_bootstrap_1.Form.Control, {
              type: "text",
              name: "image",
              value: editedMenuItem.image,
              onChange: handleInputChange,
              required: true,
            }),
          ),
          react_1["default"].createElement(
            react_bootstrap_1.Form.Group,
            null,
            react_1["default"].createElement(
              react_bootstrap_1.Form.Label,
              null,
              "Price",
            ),
            react_1["default"].createElement(react_bootstrap_1.Form.Control, {
              type: "number",
              name: "price",
              value: editedMenuItem.price,
              onChange: handleInputChange,
              required: true,
            }),
          ),
          react_1["default"].createElement(
            react_bootstrap_1.Button,
            { type: "submit" },
            "Save",
          ),
          react_1["default"].createElement(
            react_bootstrap_1.Button,
            { onClick: handleCancel },
            "Cancel",
          ),
        )
      : react_1["default"].createElement(
          react_bootstrap_1.Table,
          { className: "Table", striped: true, bordered: true, hover: true },
          react_1["default"].createElement(
            "thead",
            null,
            react_1["default"].createElement(
              "tr",
              null,
              react_1["default"].createElement("th", null, "Name"),
              react_1["default"].createElement("th", null, "Image"),
              react_1["default"].createElement("th", null, "Price"),
              react_1["default"].createElement("th", null, "Action"),
            ),
          ),
          react_1["default"].createElement(
            "tbody",
            null,
            organizedItems.map(function (section) {
              return section.items.map(function (menuItem) {
                return react_1["default"].createElement(
                  "tr",
                  { key: menuItem.id },
                  react_1["default"].createElement("td", null, menuItem.title),
                  react_1["default"].createElement(
                    "td",
                    null,
                    react_1["default"].createElement("img", {
                      src: "/" + menuItem.image,
                      alt: menuItem.title,
                      style: { width: "100px" },
                    }),
                  ),
                  react_1["default"].createElement(
                    "td",
                    null,
                    "$",
                    menuItem.price.toFixed(2),
                  ),
                  react_1["default"].createElement(
                    "td",
                    null,
                    react_1["default"].createElement(
                      react_bootstrap_1.Button,
                      {
                        onClick: function () {
                          return handleEditClick(menuItem);
                        },
                      },
                      "Edit",
                    ),
                  ),
                );
              });
            }),
          ),
        ),
    react_1["default"].createElement(
      react_bootstrap_1.Button,
      { className: "Button", onClick: handleAddClick },
      "Add New Item",
    ),
  );
};
exports["default"] = Menu;

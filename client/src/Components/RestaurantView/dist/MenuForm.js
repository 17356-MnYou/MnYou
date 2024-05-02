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
var react_router_dom_1 = require("react-router-dom"); // Import useNavigate instead of useHistory
var react_bootstrap_1 = require("react-bootstrap");
require("./RestaurantView.css");
var RestaurantForm = function () {
  var _a = react_1.useState({
      name: "",
      address: "",
      phoneNumber: "",
      username: "",
      password: "",
    }),
    newMenu = _a[0],
    setNewMenu = _a[1];
  var navigate = react_router_dom_1.useNavigate(); // Use the useNavigate hook for navigation
  var handleInputChange = function (event) {
    var _a = event.target,
      name = _a.name,
      value = _a.value;
    setNewMenu(function (prevState) {
      var _a;
      return __assign(
        __assign({}, prevState),
        ((_a = {}), (_a[name] = value), _a),
      );
    });
  };
  var handleFormSubmit = function (event) {
    return __awaiter(void 0, void 0, void 0, function () {
      var response, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            event.preventDefault();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              fetch(`${process.env.API_ENDPOINT}/restaurants/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newMenu),
              }),
            ];
          case 2:
            response = _a.sent();
            console.log("Restaurant data:", newMenu);
            if (response.ok) {
              alert("Restaurant data saved successfully"); // Show an alert or another form of feedback
              setNewMenu({
                name: "",
                address: "",
                phoneNumber: "",
                username: "",
                password: "",
              }); // Reset form
              navigate("/restaurant");
            } else {
              console.error("Failed to save restaurant data");
            }
            return [3 /*break*/, 4];
          case 3:
            error_1 = _a.sent();
            console.error("Error:", error_1);
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return react_1["default"].createElement(
    react_bootstrap_1.Form,
    { onSubmit: handleFormSubmit },
    react_1["default"].createElement(
      react_bootstrap_1.Form.Group,
      { className: "form-group-spacing" },
      react_1["default"].createElement(
        react_bootstrap_1.Form.Label,
        { className: "form-label-spacing" },
        "Restaurant Name:",
      ),
      react_1["default"].createElement(react_bootstrap_1.Form.Control, {
        className: "prettier-input",
        type: "text",
        name: "name",
        value: newMenu.name,
        onChange: handleInputChange,
      }),
    ),
    react_1["default"].createElement(
      react_bootstrap_1.Form.Group,
      { className: "form-group-spacing" },
      react_1["default"].createElement(
        react_bootstrap_1.Form.Label,
        { className: "form-label-spacing" },
        "Address:",
      ),
      react_1["default"].createElement(react_bootstrap_1.Form.Control, {
        className: "prettier-input",
        type: "text",
        name: "address",
        value: newMenu.address,
        onChange: handleInputChange,
      }),
    ),
    react_1["default"].createElement(
      react_bootstrap_1.Form.Group,
      { className: "form-group-spacing" },
      react_1["default"].createElement(
        react_bootstrap_1.Form.Label,
        { className: "form-label-spacing" },
        "Phone Number:",
      ),
      react_1["default"].createElement(react_bootstrap_1.Form.Control, {
        className: "prettier-input",
        type: "text",
        name: "phoneNumber",
        value: newMenu.phoneNumber,
        onChange: handleInputChange,
      }),
    ),
    react_1["default"].createElement(
      react_bootstrap_1.Form.Group,
      { className: "form-group-spacing" },
      react_1["default"].createElement(
        react_bootstrap_1.Form.Label,
        { className: "form-label-spacing" },
        "Username:",
      ),
      react_1["default"].createElement(react_bootstrap_1.Form.Control, {
        className: "prettier-input",
        type: "text",
        name: "username",
        value: newMenu.username,
        onChange: handleInputChange,
      }),
    ),
    react_1["default"].createElement(
      react_bootstrap_1.Form.Group,
      { className: "form-group-spacing" },
      react_1["default"].createElement(
        react_bootstrap_1.Form.Label,
        { className: "form-label-spacing" },
        "Password:",
      ),
      react_1["default"].createElement(react_bootstrap_1.Form.Control, {
        className: "prettier-input",
        type: "text",
        name: "password",
        value: newMenu.password,
        onChange: handleInputChange,
      }),
    ),
    react_1["default"].createElement(
      react_bootstrap_1.Button,
      { className: "Button", type: "submit" },
      "Save",
    ),
  );
};
exports["default"] = RestaurantForm;

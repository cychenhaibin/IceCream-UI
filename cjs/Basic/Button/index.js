var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Basic/Button/index.tsx
var Button_exports = {};
__export(Button_exports, {
  default: () => Button_default
});
module.exports = __toCommonJS(Button_exports);
var import_react = __toESM(require("react"));
var import_index = require("./index.less");
var import_classnames = __toESM(require("classnames"));
var import_ConfigProvider = require("../../ConfigProvider");
var Button_default = (props) => {
  const { type, disabled, icon, text, children, className, style, onClick, ordertype } = props;
  const { prefix } = (0, import_react.useContext)(import_ConfigProvider.ConfigContext);
  const btnPrefix = prefix + "-btn";
  const classes = (0, import_classnames.default)(
    btnPrefix,
    {
      [`${btnPrefix}-highlight`]: type === "highlight",
      [`${btnPrefix}-disabled`]: disabled
    },
    className
  );
  const getTextByOrderType = () => {
    if (ordertype === 1) {
      return "已完成";
    }
    if (ordertype === 2) {
      return "已超时";
    }
    return "未完成";
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: classes,
      style,
      onClick: (e) => {
        if (disabled) {
          return;
        }
        onClick && onClick(e);
      }
    },
    icon,
    getTextByOrderType(),
    children
  );
};

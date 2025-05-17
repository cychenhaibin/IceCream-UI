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

// src/General/Icon/index.tsx
var Icon_exports = {};
__export(Icon_exports, {
  default: () => Icon_default
});
module.exports = __toCommonJS(Icon_exports);
var import_style = require("./style/index.less");
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var Icon = ({ name, size = 30, onClick, className, spin }) => {
  const styleObj = { fontSize: size };
  const handleClick = (e) => {
    if (onClick) {
      e.stopPropagation();
      onClick(e);
    }
  };
  const classes = (0, import_classnames.default)("iconfont", {
    [`icon-${name}`]: name,
    [`icon_${name}`]: name,
    [`icon-icon_${name}`]: name,
    [`icon-icon-${name}`]: name,
    [className || ""]: className,
    "icon-spin": spin
  });
  return /* @__PURE__ */ import_react.default.createElement("i", { onClick: handleClick, className: classes, style: styleObj });
};
var Icon_default = Icon;

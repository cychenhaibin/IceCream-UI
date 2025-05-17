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

// src/Form/Rate/index.tsx
var Rate_exports = {};
__export(Rate_exports, {
  default: () => Rate_default
});
module.exports = __toCommonJS(Rate_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_index = require("./index.less");
var Rate = ({
  value,
  defaultValue = 0,
  max = 5,
  allowHalf = false,
  allowClear = false,
  disabled = false,
  readonly = false,
  texts = [],
  showText = false,
  icon = "star",
  colors = ["#F7BA2A", "#F7BA2A", "#F7BA2A"],
  lowThreshold = 2,
  highThreshold = 4,
  onChange
}) => {
  const [hoverValue, setHoverValue] = (0, import_react.useState)(-1);
  const [currentValue, setCurrentValue] = (0, import_react.useState)(defaultValue);
  const getIconCharacter = (type) => {
    switch (type) {
      case "star":
        return "★";
      case "heart":
        return "♥";
      default:
        return "★";
    }
  };
  const getColor = (index) => {
    const val = hoverValue >= 0 ? hoverValue : typeof value === "number" ? value : currentValue;
    if (val <= lowThreshold) {
      return colors[0];
    } else if (val <= highThreshold) {
      return colors[1];
    }
    return colors[2];
  };
  const handleMouseMove = (event, index) => {
    if (disabled || readonly)
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;
    if (allowHalf) {
      const isLeftHalf = position < 0.5;
      setHoverValue(isLeftHalf ? index - 0.5 : index);
    } else {
      setHoverValue(index);
    }
  };
  const handleMouseLeave = () => {
    setHoverValue(-1);
  };
  const handleClick = (event, index) => {
    if (disabled || readonly)
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;
    let newValue = index;
    if (allowHalf) {
      const isLeftHalf = position < 0.5;
      newValue = isLeftHalf ? index - 0.5 : index;
    }
    const actualValue = typeof value === "number" ? value : currentValue;
    if (allowClear && Math.abs(actualValue - newValue) < 0.1) {
      setCurrentValue(0);
      onChange == null ? void 0 : onChange(0);
    } else {
      setCurrentValue(newValue);
      onChange == null ? void 0 : onChange(newValue);
    }
  };
  const finalValue = hoverValue >= 0 ? hoverValue : typeof value === "number" ? value : currentValue;
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)("ice-rate", {
        "ice-rate-disabled": disabled,
        "ice-rate-readonly": readonly
      }),
      onMouseLeave: handleMouseLeave
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: "ice-rate-items" }, Array.from({ length: max }, (_, i) => i + 1).map((index) => {
      const isActive = finalValue >= index;
      const isHalf = allowHalf && finalValue + 0.5 === index;
      return /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          key: index,
          className: (0, import_classnames.default)("ice-rate-item", {
            "ice-rate-item-active": isActive,
            "ice-rate-item-half": isHalf
          }),
          style: {
            color: isActive || isHalf ? getColor(index) : "#E8E8E8",
            cursor: disabled || readonly ? "default" : "pointer"
          },
          onClick: (e) => handleClick(e, index),
          onMouseMove: (e) => handleMouseMove(e, index)
        },
        getIconCharacter(icon)
      );
    })),
    showText && texts.length > 0 && /* @__PURE__ */ import_react.default.createElement("span", { className: "ice-rate-text" }, texts[Math.ceil(finalValue) - 1])
  );
};
var Rate_default = Rate;

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

// src/Form/Input/index.tsx
var Input_exports = {};
__export(Input_exports, {
  default: () => Input_default
});
module.exports = __toCommonJS(Input_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_index = require("./index.less");
var Input = (props) => {
  const {
    type = "text",
    value,
    defaultValue,
    placeholder,
    disabled = false,
    readOnly = false,
    maxLength,
    minLength,
    prefix,
    suffix,
    allowClear = false,
    size = "default",
    className,
    style,
    autoFocus = false,
    onChange,
    onFocus,
    onBlur,
    onPressEnter,
    onSearch
  } = props;
  const [inputValue, setInputValue] = (0, import_react.useState)(defaultValue || "");
  const [focused, setFocused] = (0, import_react.useState)(false);
  const [showPassword, setShowPassword] = (0, import_react.useState)(false);
  const inputRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (value !== void 0) {
      setInputValue(value);
    }
  }, [value]);
  (0, import_react.useEffect)(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  const formatValue = (value2) => {
    switch (type) {
      case "number":
        return value2.replace(/[^\d.-]/g, "");
      case "tel":
        return value2.replace(/\D/g, "");
      case "email":
        return value2.trim();
      case "url":
        return value2.trim();
      default:
        return value2;
    }
  };
  const validateValue = (value2) => {
    switch (type) {
      case "email":
        return !value2 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value2);
      case "url":
        return !value2 || /^https?:\/\/.+/.test(value2);
      default:
        return true;
    }
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    const formattedValue = formatValue(newValue);
    if (maxLength && formattedValue.length > maxLength) {
      return;
    }
    if (minLength && formattedValue.length < minLength) {
      return;
    }
    if (value === void 0) {
      setInputValue(formattedValue);
    }
    onChange == null ? void 0 : onChange(formattedValue);
  };
  const handleFocus = (e) => {
    setFocused(true);
    onFocus == null ? void 0 : onFocus(e);
  };
  const handleBlur = (e) => {
    setFocused(false);
    if (!validateValue(inputValue)) {
      console.warn(`Invalid ${type} format`);
    }
    onBlur == null ? void 0 : onBlur(e);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onPressEnter == null ? void 0 : onPressEnter(e);
      if (type === "search") {
        onSearch == null ? void 0 : onSearch(inputValue);
      }
    }
  };
  const handleClear = () => {
    var _a;
    if (value === void 0) {
      setInputValue("");
    }
    onChange == null ? void 0 : onChange("");
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };
  const classes = (0, import_classnames.default)(
    "ice-input-wrapper",
    {
      [`ice-input-${size}`]: size !== "default",
      "ice-input-disabled": disabled,
      "ice-input-focused": focused,
      "ice-input-readonly": readOnly,
      "ice-input-search": type === "search"
    },
    className
  );
  return /* @__PURE__ */ import_react.default.createElement("div", { className: classes, style }, prefix && /* @__PURE__ */ import_react.default.createElement("span", { className: "ice-input-prefix" }, prefix), /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      ref: inputRef,
      type: getInputType(),
      value: inputValue,
      placeholder,
      disabled,
      readOnly,
      maxLength,
      minLength,
      className: "ice-input",
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown
    }
  ), type === "password" && /* @__PURE__ */ import_react.default.createElement("span", { className: "ice-input-password-toggle", onClick: togglePasswordVisibility }, showPassword ? "👁️" : "👁️‍🗨️"), allowClear && inputValue && !disabled && !readOnly && /* @__PURE__ */ import_react.default.createElement("span", { className: "ice-input-clear", onClick: handleClear }, "✕"), type === "search" ? /* @__PURE__ */ import_react.default.createElement("span", { className: "ice-input-suffix", onClick: () => onSearch == null ? void 0 : onSearch(inputValue) }, "🔍") : suffix && /* @__PURE__ */ import_react.default.createElement("span", { className: "ice-input-suffix" }, suffix));
};
var Input_default = Input;

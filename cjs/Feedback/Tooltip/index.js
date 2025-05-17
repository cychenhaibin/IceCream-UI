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

// src/Feedback/Tooltip/index.tsx
var Tooltip_exports = {};
__export(Tooltip_exports, {
  default: () => Tooltip_default
});
module.exports = __toCommonJS(Tooltip_exports);
var React = __toESM(require("react"));
var import_index = require("./index.less");
var import_classnames = __toESM(require("classnames"));
var import_ConfigProvider = require("../../ConfigProvider");
var Tooltip = (props) => {
  const {
    title,
    children,
    placement = "top",
    trigger = "hover",
    className,
    style
  } = props;
  const { prefix } = React.useContext(import_ConfigProvider.ConfigContext);
  const tooltipPrefix = prefix + "-tooltip";
  const [visible, setVisible] = React.useState(false);
  const tooltipRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setVisible(true);
    }
  };
  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setVisible(false);
    }
  };
  const handleClick = () => {
    if (trigger === "click") {
      setVisible(!visible);
    }
  };
  const handleFocus = () => {
    if (trigger === "focus") {
      setVisible(true);
    }
  };
  const handleBlur = () => {
    if (trigger === "focus") {
      setVisible(false);
    }
  };
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);
  const classes = (0, import_classnames.default)(tooltipPrefix, {
    [`${tooltipPrefix}-${placement}`]: placement,
    [`${tooltipPrefix}-visible`]: visible
  });
  const wrapperClasses = (0, import_classnames.default)(`${tooltipPrefix}-wrapper`, className);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: triggerRef,
      className: wrapperClasses,
      style,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur
    },
    children,
    visible && /* @__PURE__ */ React.createElement("div", { ref: tooltipRef, className: classes }, /* @__PURE__ */ React.createElement("div", { className: `${tooltipPrefix}-arrow` }), /* @__PURE__ */ React.createElement("div", { className: `${tooltipPrefix}-content` }, title))
  );
};
var Tooltip_default = Tooltip;

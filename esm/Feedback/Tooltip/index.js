function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import * as React from 'react';
import "./index.less";
import cs from 'classnames';
import { ConfigContext } from "../../ConfigProvider";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Tooltip = function Tooltip(props) {
  var title = props.title,
    children = props.children,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'top' : _props$placement,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'hover' : _props$trigger,
    className = props.className,
    style = props.style;
  var _React$useContext = React.useContext(ConfigContext),
    prefix = _React$useContext.prefix;
  var tooltipPrefix = prefix + '-tooltip';
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visible = _React$useState2[0],
    setVisible = _React$useState2[1];
  var tooltipRef = React.useRef(null);
  var triggerRef = React.useRef(null);
  var handleMouseEnter = function handleMouseEnter() {
    if (trigger === 'hover') {
      setVisible(true);
    }
  };
  var handleMouseLeave = function handleMouseLeave() {
    if (trigger === 'hover') {
      setVisible(false);
    }
  };
  var handleClick = function handleClick() {
    if (trigger === 'click') {
      setVisible(!visible);
    }
  };
  var handleFocus = function handleFocus() {
    if (trigger === 'focus') {
      setVisible(true);
    }
  };
  var handleBlur = function handleBlur() {
    if (trigger === 'focus') {
      setVisible(false);
    }
  };
  React.useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);
  var classes = cs(tooltipPrefix, _defineProperty(_defineProperty({}, "".concat(tooltipPrefix, "-").concat(placement), placement), "".concat(tooltipPrefix, "-visible"), visible));
  var wrapperClasses = cs("".concat(tooltipPrefix, "-wrapper"), className);
  return /*#__PURE__*/_jsxs("div", {
    ref: triggerRef,
    className: wrapperClasses,
    style: style,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    children: [children, visible && /*#__PURE__*/_jsxs("div", {
      ref: tooltipRef,
      className: classes,
      children: [/*#__PURE__*/_jsx("div", {
        className: "".concat(tooltipPrefix, "-arrow")
      }), /*#__PURE__*/_jsx("div", {
        className: "".concat(tooltipPrefix, "-content"),
        children: title
      })]
    })]
  });
};
export default Tooltip;
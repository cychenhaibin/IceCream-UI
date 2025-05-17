function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useContext } from 'react';
import "./index.less";
import cs from 'classnames';
import { ConfigContext } from "../../ConfigProvider";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default (function (props) {
  var type = props.type,
    disabled = props.disabled,
    icon = props.icon,
    text = props.text,
    children = props.children,
    className = props.className,
    style = props.style,
    _onClick = props.onClick,
    ordertype = props.ordertype;
  // const prefix = 'IceCream-UI'
  var _useContext = useContext(ConfigContext),
    prefix = _useContext.prefix;
  var btnPrefix = prefix + '-btn';
  var classes = cs(btnPrefix, _defineProperty(_defineProperty({}, "".concat(btnPrefix, "-highlight"), type === 'highlight'), "".concat(btnPrefix, "-disabled"), disabled), className);
  var getTextByOrderType = function getTextByOrderType() {
    if (ordertype === 1) {
      return '已完成';
    }
    if (ordertype === 2) {
      return '已超时';
    }
    return '未完成';
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes,
    style: style,
    onClick: function onClick(e) {
      if (disabled) {
        return;
      }
      _onClick && _onClick(e);
    },
    children: [icon, getTextByOrderType(), children]
  });
});
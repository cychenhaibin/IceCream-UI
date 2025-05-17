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
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Input = function Input(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? 'text' : _props$type,
    value = props.value,
    defaultValue = props.defaultValue,
    placeholder = props.placeholder,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
    maxLength = props.maxLength,
    minLength = props.minLength,
    prefix = props.prefix,
    suffix = props.suffix,
    _props$allowClear = props.allowClear,
    allowClear = _props$allowClear === void 0 ? false : _props$allowClear,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size,
    className = props.className,
    style = props.style,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
    onChange = props.onChange,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onPressEnter = props.onPressEnter,
    onSearch = props.onSearch;

  // 使用了 React 的 Hooks 来管理状态
  var _useState = useState(defaultValue || ''),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1]; // 输入框的值
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    focused = _useState4[0],
    setFocused = _useState4[1]; // 是否聚焦
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showPassword = _useState6[0],
    setShowPassword = _useState6[1]; // 是否显示密码
  var inputRef = useRef(null); // 输入框的引用

  useEffect(function () {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);
  useEffect(function () {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  var formatValue = function formatValue(value) {
    switch (type) {
      case 'number':
        // 只允许数字和小数点
        return value.replace(/[^\d.-]/g, '');
      case 'tel':
        // 只允许数字
        return value.replace(/\D/g, '');
      case 'email':
        // 移除空格
        return value.trim();
      case 'url':
        // 移除空格
        return value.trim();
      default:
        return value;
    }
  };
  var validateValue = function validateValue(value) {
    switch (type) {
      case 'email':
        // 验证邮箱格式
        return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'url':
        // 验证 URL 格式
        return !value || /^https?:\/\/.+/.test(value);
      default:
        return true;
    }
  };
  var handleChange = function handleChange(e) {
    var newValue = e.target.value; // 获取输入框的值
    var formattedValue = formatValue(newValue); // 格式化输入框的值

    // 处理最大长度限制
    if (maxLength && formattedValue.length > maxLength) {
      return;
    }

    // 处理最小长度限制
    if (minLength && formattedValue.length < minLength) {
      return;
    }
    if (value === undefined) {
      setInputValue(formattedValue); // 更新输入框的值
    }
    onChange === null || onChange === void 0 || onChange(formattedValue); // 调用 onChange 回调
  };
  var handleFocus = function handleFocus(e) {
    setFocused(true); // 设置聚焦状态
    onFocus === null || onFocus === void 0 || onFocus(e); // 调用 onFocus 回调
  };
  var handleBlur = function handleBlur(e) {
    setFocused(false); // 设置失焦状态

    if (!validateValue(inputValue)) {
      console.warn("Invalid ".concat(type, " format")); // 如果输入值不符合格式，则打印警告
    }
    onBlur === null || onBlur === void 0 || onBlur(e); // 调用 onBlur 回调
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onPressEnter === null || onPressEnter === void 0 || onPressEnter(e); // 调用 onPressEnter 回调
      if (type === 'search') {
        onSearch === null || onSearch === void 0 || onSearch(inputValue); // 调用 onSearch 回调
      }
    }
  };
  var handleClear = function handleClear() {
    var _inputRef$current;
    if (value === undefined) {
      setInputValue(''); // 如果输入框的值未定义，则清空输入框的值
    }
    onChange === null || onChange === void 0 || onChange(''); // 调用 onChange 回调
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus(); // 重新聚焦输入框
  };
  var togglePasswordVisibility = function togglePasswordVisibility() {
    setShowPassword(!showPassword); // 切换密码显示状态
  };
  var getInputType = function getInputType() {
    if (type === 'password') {
      return showPassword ? 'text' : 'password'; // 如果输入框类型为密码，则返回文本类型或密码类型
    }
    return type; // 返回输入框的类型
  };
  var classes = classNames('ice-input-wrapper', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "ice-input-".concat(size), size !== 'default'), 'ice-input-disabled', disabled), 'ice-input-focused', focused), 'ice-input-readonly', readOnly), 'ice-input-search', type === 'search'), className);
  return /*#__PURE__*/_jsxs("div", {
    className: classes,
    style: style,
    children: [prefix && /*#__PURE__*/_jsx("span", {
      className: "ice-input-prefix",
      children: prefix
    }), /*#__PURE__*/_jsx("input", {
      ref: inputRef // 输入框的引用
      ,
      type: getInputType() // 获取输入框的类型
      ,
      value: inputValue // 输入框的值
      ,
      placeholder: placeholder // 输入框的占位符
      ,
      disabled: disabled // 是否禁用输入框
      ,
      readOnly: readOnly // 是否只读
      ,
      maxLength: maxLength // 最大输入长度
      ,
      minLength: minLength // 最小输入长度
      ,
      className: "ice-input" // 输入框的类名
      ,
      onChange: handleChange // 输入框值变化时的回调
      ,
      onFocus: handleFocus // 输入框聚焦时的回调
      ,
      onBlur: handleBlur // 输入框失焦时的回调
      ,
      onKeyDown: handleKeyDown // 按下回车键时的回调
    }), type === 'password' && /*#__PURE__*/_jsx("span", {
      className: "ice-input-password-toggle",
      onClick: togglePasswordVisibility,
      children: showPassword ? '👁️' : '👁️‍🗨️'
    }), allowClear && inputValue && !disabled && !readOnly && /*#__PURE__*/_jsx("span", {
      className: "ice-input-clear",
      onClick: handleClear,
      children: "\u2715"
    }), type === 'search' ? /*#__PURE__*/_jsx("span", {
      className: "ice-input-suffix",
      onClick: function onClick() {
        return onSearch === null || onSearch === void 0 ? void 0 : onSearch(inputValue);
      },
      children: "\uD83D\uDD0D"
    }) : suffix && /*#__PURE__*/_jsx("span", {
      className: "ice-input-suffix",
      children: suffix
    }) // 输入框后缀
    ]
  });
};
export default Input;
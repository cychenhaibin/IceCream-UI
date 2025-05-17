function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import React, { useContext, useEffect, useState } from 'react';
import "./index.less";
import cs from 'classnames';
import { ConfigContext } from "../../ConfigProvider";

// 消息管理器
import { jsx as _jsx } from "react/jsx-runtime";
var messageManager = {
  messages: new Set(),
  listeners: new Set(),
  getOffset: function getOffset(id) {
    var messages = Array.from(messageManager.messages);
    var index = messages.indexOf(id);
    return 16 + index * 60; // 顶部间距 16px，每个消息高度为 60px
  },
  add: function add(id) {
    // 将新消息添加到 Set 的开头
    var newMessages = new Set([id].concat(_toConsumableArray(messageManager.messages)));
    messageManager.messages = newMessages;
    messageManager.notifyListeners();
  },
  remove: function remove(id) {
    messageManager.messages.delete(id);
    messageManager.notifyListeners();
  },
  subscribe: function subscribe(listener) {
    messageManager.listeners.add(listener);
    return function () {
      messageManager.listeners.delete(listener);
    };
  },
  notifyListeners: function notifyListeners() {
    messageManager.listeners.forEach(function (listener) {
      return listener();
    });
  }
};
var Message = function Message(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? 'info' : _props$type,
    content = props.content,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 3000 : _props$duration,
    onClose = props.onClose;
  var _useContext = useContext(ConfigContext),
    prefix = _useContext.prefix;
  var messagePrefix = prefix + '-message';
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var _useState3 = useState(function () {
      return Date.now();
    }),
    _useState4 = _slicedToArray(_useState3, 1),
    id = _useState4[0];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    offset = _useState6[0],
    setOffset = _useState6[1];
  useEffect(function () {
    messageManager.add(id);
    setOffset(messageManager.getOffset(id));
    var unsubscribe = messageManager.subscribe(function () {
      setOffset(messageManager.getOffset(id));
    });
    var timer = setTimeout(function () {
      setVisible(false);
      messageManager.remove(id);
      onClose === null || onClose === void 0 || onClose();
    }, duration);
    return function () {
      clearTimeout(timer);
      messageManager.remove(id);
      unsubscribe();
    };
  }, [duration, onClose, id]);
  var classes = cs(messagePrefix, _defineProperty({}, "".concat(messagePrefix, "-").concat(type), type));
  if (!visible) return null;
  return /*#__PURE__*/_jsx("div", {
    className: classes,
    style: {
      position: 'fixed',
      top: "".concat(offset, "px"),
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      transition: 'top 0.3s ease-in-out'
    },
    children: /*#__PURE__*/_jsx("div", {
      className: "".concat(messagePrefix, "-content"),
      children: content
    })
  });
};
export default Message;
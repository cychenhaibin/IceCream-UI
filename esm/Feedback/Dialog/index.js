function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var Dialog = function Dialog(_ref) {
  var _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? false : _ref$visible,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '标题' : _ref$title,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 520 : _ref$width,
    top = _ref.top,
    _ref$centered = _ref.centered,
    centered = _ref$centered === void 0 ? false : _ref$centered,
    _ref$closable = _ref.closable,
    closable = _ref$closable === void 0 ? true : _ref$closable,
    _ref$mask = _ref.mask,
    mask = _ref$mask === void 0 ? true : _ref$mask,
    _ref$maskClosable = _ref.maskClosable,
    maskClosable = _ref$maskClosable === void 0 ? true : _ref$maskClosable,
    _ref$keyboard = _ref.keyboard,
    keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
    _ref$destroyOnClose = _ref.destroyOnClose,
    destroyOnClose = _ref$destroyOnClose === void 0 ? false : _ref$destroyOnClose,
    _ref$fullscreen = _ref.fullscreen,
    fullscreen = _ref$fullscreen === void 0 ? false : _ref$fullscreen,
    _ref$draggable = _ref.draggable,
    draggable = _ref$draggable === void 0 ? false : _ref$draggable,
    footer = _ref.footer,
    afterClose = _ref.afterClose,
    onClose = _ref.onClose,
    onOk = _ref.onOk,
    children = _ref.children,
    className = _ref.className,
    style = _ref.style;
  var _useState = useState(visible),
    _useState2 = _slicedToArray(_useState, 2),
    internalVisible = _useState2[0],
    setInternalVisible = _useState2[1];
  var _useState3 = useState({
      x: 0,
      y: 0
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    position = _useState4[0],
    setPosition = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isDragging = _useState6[0],
    setIsDragging = _useState6[1];
  var _useState7 = useState({
      x: 0,
      y: 0
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    dragOffset = _useState8[0],
    setDragOffset = _useState8[1];
  var dialogRef = useRef(null);
  var dragStartPos = useRef({
    x: 0,
    y: 0
  });
  var _useState9 = useState(1000),
    _useState10 = _slicedToArray(_useState9, 2),
    zIndex = _useState10[0],
    setZIndex = _useState10[1];
  useEffect(function () {
    setInternalVisible(visible);
  }, [visible]);
  useEffect(function () {
    if (visible) {
      // Get the highest z-index from existing dialogs
      var dialogs = document.querySelectorAll('.ice-dialog-root');
      var maxZIndex = 1000;
      dialogs.forEach(function (dialog) {
        var zIndex = parseInt(window.getComputedStyle(dialog).zIndex || '1000', 10);
        maxZIndex = Math.max(maxZIndex, zIndex);
      });
      setZIndex(maxZIndex + 1);
    }
  }, [visible]);
  useEffect(function () {
    if (keyboard) {
      var handleKeyDown = function handleKeyDown(e) {
        if (e.key === 'Escape' && internalVisible) {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return function () {
        return document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [keyboard, internalVisible]);
  var handleClose = function handleClose() {
    setInternalVisible(false);
    onClose === null || onClose === void 0 || onClose();
    if (destroyOnClose) {
      afterClose === null || afterClose === void 0 || afterClose();
    }
  };
  var handleOk = function handleOk() {
    onOk === null || onOk === void 0 || onOk();
  };
  var handleMaskClick = function handleMaskClick() {
    if (maskClosable) {
      handleClose();
    }
  };
  var handleMouseDown = function handleMouseDown(e) {
    if (draggable && dialogRef.current) {
      setIsDragging(true);
      var rect = dialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      dragStartPos.current = {
        x: e.clientX,
        y: e.clientY
      };
    }
  };
  var handleMouseMove = function handleMouseMove(e) {
    if (isDragging && draggable) {
      var newX = e.clientX - dragOffset.x;
      var newY = e.clientY - dragOffset.y;
      setPosition({
        x: newX,
        y: newY
      });
    }
  };
  var handleMouseUp = function handleMouseUp() {
    setIsDragging(false);
  };
  useEffect(function () {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return function () {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);
  var renderDialog = function renderDialog() {
    if (!internalVisible && destroyOnClose) {
      return null;
    }
    var dialogStyle = _objectSpread({
      width: fullscreen ? '100%' : width,
      zIndex: zIndex + 1
    }, style);
    if (fullscreen) {
      dialogStyle.top = 0;
      dialogStyle.left = 0;
      dialogStyle.transform = 'none';
    } else if (draggable && (position.x !== 0 || position.y !== 0)) {
      dialogStyle.left = position.x;
      dialogStyle.top = position.y;
      dialogStyle.transform = 'none';
    } else if (centered) {
      dialogStyle.top = '50%';
      dialogStyle.left = '50%';
      dialogStyle.transform = 'translate(-50%, -50%)';
    } else {
      dialogStyle.top = '33.33vh';
      dialogStyle.left = '50%';
      dialogStyle.transform = 'translate(-50%, -50%)';
    }
    var dialogClass = classNames('ice-dialog', _defineProperty({
      visible: internalVisible,
      'ice-dialog-centered': centered && !fullscreen && !draggable,
      'ice-dialog-fullscreen': fullscreen,
      'ice-dialog-draggable': draggable
    }, className || '', !!className));
    var maskClass = classNames('ice-dialog-mask', {
      visible: internalVisible
    });
    var rootStyle = {
      zIndex: zIndex
    };
    return /*#__PURE__*/_jsxs("div", {
      className: internalVisible ? 'ice-dialog-root visible' : 'ice-dialog-root',
      style: rootStyle,
      children: [mask && /*#__PURE__*/_jsx("div", {
        className: maskClass,
        onClick: handleMaskClick,
        style: {
          zIndex: zIndex
        }
      }), /*#__PURE__*/_jsxs("div", {
        ref: dialogRef,
        className: dialogClass,
        style: dialogStyle,
        children: [/*#__PURE__*/_jsxs("div", {
          className: "ice-dialog-header",
          onMouseDown: handleMouseDown,
          children: [/*#__PURE__*/_jsx("div", {
            className: "ice-dialog-title",
            children: title
          }), closable && /*#__PURE__*/_jsx("div", {
            className: "ice-dialog-close",
            onClick: handleClose,
            children: "\xD7"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "ice-dialog-content",
          children: children
        }), footer !== null && /*#__PURE__*/_jsx("div", {
          className: "ice-dialog-footer",
          children: footer || /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("button", {
              className: "ice-dialog-btn ice-dialog-btn-default",
              onClick: handleClose,
              children: "Cancel"
            }), /*#__PURE__*/_jsx("button", {
              className: "ice-dialog-btn ice-dialog-btn-primary",
              onClick: handleOk,
              children: "Confirm"
            })]
          })
        })]
      })]
    });
  };
  return /*#__PURE__*/ReactDOM.createPortal(renderDialog(), document.body);
};
export default Dialog;
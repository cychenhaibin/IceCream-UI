function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState } from 'react';
import classNames from 'classnames';
import "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Rate = function Rate(_ref) {
  var value = _ref.value,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? 0 : _ref$defaultValue,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 5 : _ref$max,
    _ref$allowHalf = _ref.allowHalf,
    allowHalf = _ref$allowHalf === void 0 ? false : _ref$allowHalf,
    _ref$allowClear = _ref.allowClear,
    allowClear = _ref$allowClear === void 0 ? false : _ref$allowClear,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$readonly = _ref.readonly,
    readonly = _ref$readonly === void 0 ? false : _ref$readonly,
    _ref$texts = _ref.texts,
    texts = _ref$texts === void 0 ? [] : _ref$texts,
    _ref$showText = _ref.showText,
    showText = _ref$showText === void 0 ? false : _ref$showText,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? 'star' : _ref$icon,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? ['#F7BA2A', '#F7BA2A', '#F7BA2A'] : _ref$colors,
    _ref$lowThreshold = _ref.lowThreshold,
    lowThreshold = _ref$lowThreshold === void 0 ? 2 : _ref$lowThreshold,
    _ref$highThreshold = _ref.highThreshold,
    highThreshold = _ref$highThreshold === void 0 ? 4 : _ref$highThreshold,
    onChange = _ref.onChange;
  var _useState = useState(-1),
    _useState2 = _slicedToArray(_useState, 2),
    hoverValue = _useState2[0],
    setHoverValue = _useState2[1];
  var _useState3 = useState(defaultValue),
    _useState4 = _slicedToArray(_useState3, 2),
    currentValue = _useState4[0],
    setCurrentValue = _useState4[1];

  // 获取图标字符
  var getIconCharacter = function getIconCharacter(type) {
    switch (type) {
      case 'star':
        return '★';
      case 'heart':
        return '♥';
      default:
        return '★';
    }
  };

  // 获取颜色
  var getColor = function getColor(index) {
    var val = hoverValue >= 0 ? hoverValue : typeof value === 'number' ? value : currentValue;
    if (val <= lowThreshold) {
      return colors[0];
    } else if (val <= highThreshold) {
      return colors[1];
    }
    return colors[2];
  };

  // 处理鼠标移动
  var handleMouseMove = function handleMouseMove(event, index) {
    if (disabled || readonly) return;
    var rect = event.currentTarget.getBoundingClientRect();
    var position = (event.clientX - rect.left) / rect.width;
    if (allowHalf) {
      // 使用更精确的判断逻辑
      var isLeftHalf = position < 0.5;
      setHoverValue(isLeftHalf ? index - 0.5 : index);
    } else {
      setHoverValue(index);
    }
  };

  // 处理鼠标离开
  var handleMouseLeave = function handleMouseLeave() {
    setHoverValue(-1);
  };

  // 处理点击
  var handleClick = function handleClick(event, index) {
    if (disabled || readonly) return;
    var rect = event.currentTarget.getBoundingClientRect();
    var position = (event.clientX - rect.left) / rect.width;
    var newValue = index;
    if (allowHalf) {
      // 使用更精确的判断逻辑
      var isLeftHalf = position < 0.5;
      newValue = isLeftHalf ? index - 0.5 : index;
    }

    // 使用实际值而不是finalValue来判断是否清除
    var actualValue = typeof value === 'number' ? value : currentValue;
    if (allowClear && Math.abs(actualValue - newValue) < 0.1) {
      setCurrentValue(0);
      onChange === null || onChange === void 0 || onChange(0);
    } else {
      setCurrentValue(newValue);
      onChange === null || onChange === void 0 || onChange(newValue);
    }
  };

  // hoverValue 优先于 value 和 currentValue，实现动态 hover 效果
  var finalValue = hoverValue >= 0 ? hoverValue : typeof value === 'number' ? value : currentValue;
  return /*#__PURE__*/_jsxs("div", {
    className: classNames('ice-rate', {
      'ice-rate-disabled': disabled,
      'ice-rate-readonly': readonly
    }),
    onMouseLeave: handleMouseLeave,
    children: [/*#__PURE__*/_jsx("div", {
      className: "ice-rate-items",
      children: Array.from({
        length: max
      }, function (_, i) {
        return i + 1;
      }).map(function (index) {
        var isActive = finalValue >= index;
        var isHalf = allowHalf && finalValue + 0.5 === index;
        return /*#__PURE__*/_jsx("div", {
          className: classNames('ice-rate-item', {
            'ice-rate-item-active': isActive,
            'ice-rate-item-half': isHalf
          }),
          style: {
            color: isActive || isHalf ? getColor(index) : '#E8E8E8',
            cursor: disabled || readonly ? 'default' : 'pointer'
          },
          onClick: function onClick(e) {
            return handleClick(e, index);
          },
          onMouseMove: function onMouseMove(e) {
            return handleMouseMove(e, index);
          },
          children: getIconCharacter(icon)
        }, index);
      })
    }), showText && texts.length > 0 && /*#__PURE__*/_jsx("span", {
      className: "ice-rate-text",
      children: texts[Math.ceil(finalValue) - 1]
    })]
  });
};
export default Rate;
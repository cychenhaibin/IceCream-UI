function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from 'react';
import "./index.less";
import cs from 'classnames';
import { ConfigContext } from "../../ConfigProvider";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var InputTag = function InputTag(props) {
  var value = props.value,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? [] : _props$defaultValue,
    _props$placeholder = props.placeholder,
    placeholder = _props$placeholder === void 0 ? '请输入' : _props$placeholder,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
    maxLength = props.maxLength,
    maxTags = props.maxTags,
    className = props.className,
    style = props.style,
    onChange = props.onChange,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onPressEnter = props.onPressEnter;
  var _React$useContext = React.useContext(ConfigContext),
    prefix = _React$useContext.prefix; // 获取配置上下文中的前缀
  var inputTagPrefix = prefix + '-input-tag'; // 输入框标签的前缀
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tags = _React$useState2[0],
    setTags = _React$useState2[1]; // 标签状态
  var _React$useState3 = React.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    inputValue = _React$useState4[0],
    setInputValue = _React$useState4[1]; // 输入框的值
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focused = _React$useState6[0],
    setFocused = _React$useState6[1]; // 是否聚焦
  var inputRef = React.useRef(null); // 输入框的引用
  // 如果输入框的值不为 undefined，则设置标签状态
  React.useEffect(function () {
    if (value !== undefined) {
      setTags(value);
    }
  }, [value]);
  // 输入框值变化时的回调
  var handleInputChange = function handleInputChange(e) {
    setInputValue(e.target.value); // 设置输入框的值
  };
  // 按下回车键时的回调
  var handleInputKeyDown = function handleInputKeyDown(e) {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (maxTags && tags.length >= maxTags) {
        return;
      }
      var newTags = [].concat(_toConsumableArray(tags), [inputValue.trim()]);
      setTags(newTags);
      setInputValue('');
      onChange === null || onChange === void 0 || onChange(newTags);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      var _newTags = tags.slice(0, -1);
      setTags(_newTags);
      onChange === null || onChange === void 0 || onChange(_newTags);
    }
  };
  // 关闭标签时的回调
  var handleTagClose = function handleTagClose(index) {
    var newTags = _toConsumableArray(tags); // 创建新的标签数组
    newTags.splice(index, 1); // 删除指定索引的标签
    setTags(newTags); // 更新标签状态
    onChange === null || onChange === void 0 || onChange(newTags); // 调用 onChange 回调
  };
  // 拖拽结束时的回调
  var handleDragEnd = function handleDragEnd(result) {
    if (!result.destination) return;
    // 重新排序标签
    var items = Array.from(tags);
    var _items$splice = items.splice(result.source.index, 1),
      _items$splice2 = _slicedToArray(_items$splice, 1),
      reorderedItem = _items$splice2[0];
    items.splice(result.destination.index, 0, reorderedItem);
    // 更新标签状态
    setTags(items);
    // 调用 onChange 回调
    onChange === null || onChange === void 0 || onChange(items);
  };
  // 聚焦时的回调
  var handleFocus = function handleFocus(e) {
    setFocused(true);
    onFocus === null || onFocus === void 0 || onFocus(e);
  };
  // 失焦时的回调
  var handleBlur = function handleBlur(e) {
    setFocused(false);
    onBlur === null || onBlur === void 0 || onBlur(e);
  };
  // 类名
  var classes = cs(inputTagPrefix, _defineProperty(_defineProperty({}, "".concat(inputTagPrefix, "-disabled"), disabled), "".concat(inputTagPrefix, "-focused"), focused), className);
  // 返回组件
  return /*#__PURE__*/_jsxs("div", {
    className: classes,
    style: style,
    children: [/*#__PURE__*/_jsx(DragDropContext, {
      onDragEnd: handleDragEnd,
      children: /*#__PURE__*/_jsx(Droppable, {
        droppableId: "tags",
        direction: "horizontal",
        children: function children(provided) {
          return /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({}, provided.droppableProps), {}, {
            // 拖拽容器属性
            ref: provided.innerRef // 拖拽容器引用
            ,
            className: "".concat(inputTagPrefix, "-tags") // 标签容器类名
            ,
            children: [tags.map(function (tag, index) {
              return /*#__PURE__*/_jsx(Draggable, {
                // 唯一标识
                draggableId: "tag-".concat(index) // 拖拽元素的 ID
                ,
                index: index // 拖拽元素的索引
                ,
                isDragDisabled: disabled || readOnly // 是否禁用拖拽
                ,
                children: function children(provided) {
                  return /*#__PURE__*/_jsxs("span", _objectSpread(_objectSpread(_objectSpread({
                    ref: provided.innerRef // 拖拽元素引用
                  }, provided.draggableProps), provided.dragHandleProps), {}, {
                    // 拖拽元素手柄属性
                    className: "".concat(inputTagPrefix, "-tag") // 标签类名
                    ,
                    children: [tag, !disabled && !readOnly && /*#__PURE__*/_jsx("span", {
                      className: "".concat(inputTagPrefix, "-tag-close") // 标签关闭类名
                      ,
                      onClick: function onClick() {
                        return handleTagClose(index);
                      } // 标签关闭点击回调
                      ,
                      children: "\xD7"
                    })]
                  }));
                }
              }, index);
            }), provided.placeholder]
          }));
        }
      })
    }), /*#__PURE__*/_jsx("input", {
      ref: inputRef // 输入框的引用
      ,
      type: "text" // 输入框的类型
      ,
      value: inputValue // 输入框的值
      ,
      placeholder: tags.length === 0 ? placeholder : '' // 输入框的占位符
      ,
      disabled: disabled // 是否禁用输入框
      ,
      readOnly: readOnly // 是否只读
      ,
      maxLength: maxLength // 最大输入长度
      ,
      className: "".concat(inputTagPrefix, "-input") // 输入框的类名
      ,
      onChange: handleInputChange // 输入框值变化时的回调
      ,
      onKeyDown: handleInputKeyDown // 按下回车键时的回调
      ,
      onFocus: handleFocus // 输入框聚焦时的回调
      ,
      onBlur: handleBlur // 输入框失焦时的回调
    })]
  });
};
export default InputTag;
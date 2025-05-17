var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/Form/InputTag/index.tsx
var InputTag_exports = {};
__export(InputTag_exports, {
  default: () => InputTag_default,
});
module.exports = __toCommonJS(InputTag_exports);
var import_react = __toESM(require('react'));
var import_index = require('./index.less');
var import_classnames = __toESM(require('classnames'));
var import_ConfigProvider = require('../../ConfigProvider');
var import_dnd = require('@hello-pangea/dnd');
var InputTag = (props) => {
  const {
    value,
    // 输入框的值
    defaultValue = [],
    // 输入框的默认值
    placeholder = '请输入',
    // 输入框的占位符
    disabled = false,
    // 是否禁用输入框
    readOnly = false,
    // 是否只读
    maxLength,
    // 最大输入长度
    maxTags,
    // 最大标签数
    className,
    // 输入框的类名
    style,
    // 输入框的样式
    onChange,
    // 输入框值变化时的回调
    onFocus,
    // 输入框聚焦时的回调
    onBlur,
    // 输入框失焦时的回调
    onPressEnter,
    // 按下回车键时的回调
  } = props;
  const { prefix } = import_react.default.useContext(import_ConfigProvider.ConfigContext);
  const inputTagPrefix = prefix + '-input-tag';
  const [tags, setTags] = import_react.default.useState(defaultValue);
  const [inputValue, setInputValue] = import_react.default.useState('');
  const [focused, setFocused] = import_react.default.useState(false);
  const inputRef = import_react.default.useRef(null);
  import_react.default.useEffect(() => {
    if (value !== void 0) {
      setTags(value);
    }
  }, [value]);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (maxTags && tags.length >= maxTags) {
        return;
      }
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue('');
      onChange == null ? void 0 : onChange(newTags);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onChange == null ? void 0 : onChange(newTags);
    }
  };
  const handleTagClose = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    onChange == null ? void 0 : onChange(newTags);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tags);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTags(items);
    onChange == null ? void 0 : onChange(items);
  };
  const handleFocus = (e) => {
    setFocused(true);
    onFocus == null ? void 0 : onFocus(e);
  };
  const handleBlur = (e) => {
    setFocused(false);
    onBlur == null ? void 0 : onBlur(e);
  };
  const classes = (0, import_classnames.default)(
    inputTagPrefix,
    {
      [`${inputTagPrefix}-disabled`]: disabled,
      [`${inputTagPrefix}-focused`]: focused,
    },
    className,
  );
  return /* @__PURE__ */ import_react.default.createElement(
    'div',
    { className: classes, style },
    /* @__PURE__ */ import_react.default.createElement(
      import_dnd.DragDropContext,
      { onDragEnd: handleDragEnd },
      /* @__PURE__ */ import_react.default.createElement(
        import_dnd.Droppable,
        { droppableId: 'tags', direction: 'horizontal' },
        (provided) =>
          /* @__PURE__ */ import_react.default.createElement(
            'div',
            {
              ...provided.droppableProps,
              ref: provided.innerRef,
              className: `${inputTagPrefix}-tags`,
            },
            tags.map((tag, index) =>
              /* @__PURE__ */ import_react.default.createElement(
                import_dnd.Draggable,
                {
                  key: index,
                  draggableId: `tag-${index}`,
                  index,
                  isDragDisabled: disabled || readOnly,
                },
                (provided2) =>
                  /* @__PURE__ */ import_react.default.createElement(
                    'span',
                    {
                      ref: provided2.innerRef,
                      ...provided2.draggableProps,
                      ...provided2.dragHandleProps,
                      className: `${inputTagPrefix}-tag`,
                    },
                    tag,
                    !disabled &&
                      !readOnly &&
                      /* @__PURE__ */ import_react.default.createElement(
                        'span',
                        {
                          className: `${inputTagPrefix}-tag-close`,
                          onClick: () => handleTagClose(index),
                        },
                        '×',
                      ),
                  ),
              ),
            ),
            provided.placeholder,
          ),
      ),
    ),
    /* @__PURE__ */ import_react.default.createElement('input', {
      ref: inputRef,
      type: 'text',
      value: inputValue,
      placeholder: tags.length === 0 ? placeholder : '',
      disabled,
      readOnly,
      maxLength,
      className: `${inputTagPrefix}-input`,
      onChange: handleInputChange,
      onKeyDown: handleInputKeyDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
    }),
  );
};
var InputTag_default = InputTag;

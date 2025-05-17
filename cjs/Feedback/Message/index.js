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

// src/Feedback/Message/index.tsx
var Message_exports = {};
__export(Message_exports, {
  default: () => Message_default
});
module.exports = __toCommonJS(Message_exports);
var import_react = __toESM(require("react"));
var import_index = require("./index.less");
var import_classnames = __toESM(require("classnames"));
var import_ConfigProvider = require("../../ConfigProvider");
var messageManager = {
  messages: /* @__PURE__ */ new Set(),
  listeners: /* @__PURE__ */ new Set(),
  getOffset: (id) => {
    const messages = Array.from(messageManager.messages);
    const index = messages.indexOf(id);
    return 16 + index * 60;
  },
  add: (id) => {
    const newMessages = /* @__PURE__ */ new Set([id, ...messageManager.messages]);
    messageManager.messages = newMessages;
    messageManager.notifyListeners();
  },
  remove: (id) => {
    messageManager.messages.delete(id);
    messageManager.notifyListeners();
  },
  subscribe: (listener) => {
    messageManager.listeners.add(listener);
    return () => {
      messageManager.listeners.delete(listener);
    };
  },
  notifyListeners: () => {
    messageManager.listeners.forEach((listener) => listener());
  }
};
var Message = (props) => {
  const { type = "info", content, duration = 3e3, onClose } = props;
  const { prefix } = (0, import_react.useContext)(import_ConfigProvider.ConfigContext);
  const messagePrefix = prefix + "-message";
  const [visible, setVisible] = (0, import_react.useState)(true);
  const [id] = (0, import_react.useState)(() => Date.now());
  const [offset, setOffset] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    messageManager.add(id);
    setOffset(messageManager.getOffset(id));
    const unsubscribe = messageManager.subscribe(() => {
      setOffset(messageManager.getOffset(id));
    });
    const timer = setTimeout(() => {
      setVisible(false);
      messageManager.remove(id);
      onClose == null ? void 0 : onClose();
    }, duration);
    return () => {
      clearTimeout(timer);
      messageManager.remove(id);
      unsubscribe();
    };
  }, [duration, onClose, id]);
  const classes = (0, import_classnames.default)(messagePrefix, {
    [`${messagePrefix}-${type}`]: type
  });
  if (!visible)
    return null;
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: classes,
      style: {
        position: "fixed",
        top: `${offset}px`,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1e3,
        transition: "top 0.3s ease-in-out"
      }
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: `${messagePrefix}-content` }, content)
  );
};
var Message_default = Message;

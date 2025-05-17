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

// src/Feedback/Message/message.ts
var message_exports = {};
__export(message_exports, {
  default: () => message_default,
});
module.exports = __toCommonJS(message_exports);
var import_react = __toESM(require('react'));
var import_client = require('react-dom/client');
var import_index = __toESM(require('./index'));
var createMessage = (type, content, duration) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = (0, import_client.createRoot)(container);
  const handleClose = () => {
    root.unmount();
    document.body.removeChild(container);
  };
  const messageElement = import_react.default.createElement(import_index.default, {
    type,
    content,
    duration,
    onClose: handleClose,
  });
  root.render(messageElement);
};
var message_default = {
  success: (content, duration) => {
    createMessage('success', content, duration);
  },
  warning: (content, duration) => {
    createMessage('warning', content, duration);
  },
  error: (content, duration) => {
    createMessage('error', content, duration);
  },
  info: (content, duration) => {
    createMessage('info', content, duration);
  },
};

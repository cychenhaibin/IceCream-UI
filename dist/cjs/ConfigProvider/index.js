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

// src/ConfigProvider/index.tsx
var ConfigProvider_exports = {};
__export(ConfigProvider_exports, {
  ConfigContext: () => ConfigContext,
  default: () => ConfigProvider_default,
});
module.exports = __toCommonJS(ConfigProvider_exports);
var import_react = __toESM(require('react'));
var defaultConfig = {
  prefix: 'IceCream-UI',
};
var ConfigContext = (0, import_react.createContext)(defaultConfig);
function ConfigProvider({ children, ...config }) {
  return /* @__PURE__ */ import_react.default.createElement(
    ConfigContext.Provider,
    { value: config },
    children,
  );
}
var ConfigProvider_default = ConfigProvider;
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    ConfigContext,
  });

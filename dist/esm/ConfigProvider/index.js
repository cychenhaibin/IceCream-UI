var _excluded = ['children'];
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
import React, { createContext } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
var defaultConfig = {
  prefix: 'IceCream-UI',
};
export var ConfigContext = /*#__PURE__*/ createContext(defaultConfig);
function ConfigProvider(_ref) {
  var children = _ref.children,
    config = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/ _jsx(ConfigContext.Provider, {
    value: config,
    children: children,
  });
}
export default ConfigProvider;

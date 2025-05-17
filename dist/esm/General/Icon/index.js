function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}
import './style/index.less';
import classNames from 'classnames';
import React from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
var Icon = function Icon(_ref) {
  var name = _ref.name,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 30 : _ref$size,
    onClick = _ref.onClick,
    className = _ref.className,
    spin = _ref.spin;
  var styleObj = {
    fontSize: size,
  };
  var handleClick = function handleClick(e) {
    if (onClick) {
      e.stopPropagation();
      onClick(e);
    }
  };
  var classes = classNames(
    'iconfont',
    _defineProperty(
      _defineProperty(
        _defineProperty(
          _defineProperty(
            _defineProperty(
              _defineProperty({}, 'icon-'.concat(name), name),
              'icon_'.concat(name),
              name,
            ),
            'icon-icon_'.concat(name),
            name,
          ),
          'icon-icon-'.concat(name),
          name,
        ),
        className || '',
        className,
      ),
      'icon-spin',
      spin,
    ),
  );
  return /*#__PURE__*/ _jsx('i', {
    onClick: handleClick,
    className: classes,
    style: styleObj,
  });
};
export default Icon;

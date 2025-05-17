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

// src/Feedback/Dialog/index.tsx
var Dialog_exports = {};
__export(Dialog_exports, {
  default: () => Dialog_default,
});
module.exports = __toCommonJS(Dialog_exports);
var import_react = __toESM(require('react'));
var import_react_dom = __toESM(require('react-dom'));
var import_classnames = __toESM(require('classnames'));
var import_index = require('./index.less');
var Dialog = ({
  visible = false,
  title = '标题',
  width = 520,
  top,
  centered = false,
  closable = true,
  mask = true,
  maskClosable = true,
  keyboard = true,
  destroyOnClose = false,
  fullscreen = false,
  draggable = false,
  footer,
  afterClose,
  onClose,
  onOk,
  children,
  className,
  style,
}) => {
  const [internalVisible, setInternalVisible] = (0, import_react.useState)(visible);
  const [position, setPosition] = (0, import_react.useState)({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = (0, import_react.useState)(false);
  const [dragOffset, setDragOffset] = (0, import_react.useState)({ x: 0, y: 0 });
  const dialogRef = (0, import_react.useRef)(null);
  const dragStartPos = (0, import_react.useRef)({ x: 0, y: 0 });
  const [zIndex, setZIndex] = (0, import_react.useState)(1e3);
  (0, import_react.useEffect)(() => {
    setInternalVisible(visible);
  }, [visible]);
  (0, import_react.useEffect)(() => {
    if (visible) {
      const dialogs = document.querySelectorAll('.ice-dialog-root');
      let maxZIndex = 1e3;
      dialogs.forEach((dialog) => {
        const zIndex2 = parseInt(window.getComputedStyle(dialog).zIndex || '1000', 10);
        maxZIndex = Math.max(maxZIndex, zIndex2);
      });
      setZIndex(maxZIndex + 1);
    }
  }, [visible]);
  (0, import_react.useEffect)(() => {
    if (keyboard) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape' && internalVisible) {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [keyboard, internalVisible]);
  const handleClose = () => {
    setInternalVisible(false);
    onClose == null ? void 0 : onClose();
    if (destroyOnClose) {
      afterClose == null ? void 0 : afterClose();
    }
  };
  const handleOk = () => {
    onOk == null ? void 0 : onOk();
  };
  const handleMaskClick = () => {
    if (maskClosable) {
      handleClose();
    }
  };
  const handleMouseDown = (e) => {
    if (draggable && dialogRef.current) {
      setIsDragging(true);
      const rect = dialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };
  const handleMouseMove = (e) => {
    if (isDragging && draggable) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  (0, import_react.useEffect)(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);
  const renderDialog = () => {
    if (!internalVisible && destroyOnClose) {
      return null;
    }
    const dialogStyle = {
      width: fullscreen ? '100%' : width,
      zIndex: zIndex + 1,
      ...style,
    };
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
    const dialogClass = (0, import_classnames.default)('ice-dialog', {
      visible: internalVisible,
      'ice-dialog-centered': centered && !fullscreen && !draggable,
      'ice-dialog-fullscreen': fullscreen,
      'ice-dialog-draggable': draggable,
      [className || '']: !!className,
    });
    const maskClass = (0, import_classnames.default)('ice-dialog-mask', {
      visible: internalVisible,
    });
    const rootStyle = {
      zIndex,
    };
    return /* @__PURE__ */ import_react.default.createElement(
      'div',
      {
        className: internalVisible ? 'ice-dialog-root visible' : 'ice-dialog-root',
        style: rootStyle,
      },
      mask &&
        /* @__PURE__ */ import_react.default.createElement('div', {
          className: maskClass,
          onClick: handleMaskClick,
          style: { zIndex },
        }),
      /* @__PURE__ */ import_react.default.createElement(
        'div',
        { ref: dialogRef, className: dialogClass, style: dialogStyle },
        /* @__PURE__ */ import_react.default.createElement(
          'div',
          { className: 'ice-dialog-header', onMouseDown: handleMouseDown },
          /* @__PURE__ */ import_react.default.createElement(
            'div',
            { className: 'ice-dialog-title' },
            title,
          ),
          closable &&
            /* @__PURE__ */ import_react.default.createElement(
              'div',
              { className: 'ice-dialog-close', onClick: handleClose },
              '×',
            ),
        ),
        /* @__PURE__ */ import_react.default.createElement(
          'div',
          { className: 'ice-dialog-content' },
          children,
        ),
        footer !== null &&
          /* @__PURE__ */ import_react.default.createElement(
            'div',
            { className: 'ice-dialog-footer' },
            footer ||
              /* @__PURE__ */ import_react.default.createElement(
                import_react.default.Fragment,
                null,
                /* @__PURE__ */ import_react.default.createElement(
                  'button',
                  { className: 'ice-dialog-btn ice-dialog-btn-default', onClick: handleClose },
                  'Cancel',
                ),
                /* @__PURE__ */ import_react.default.createElement(
                  'button',
                  { className: 'ice-dialog-btn ice-dialog-btn-primary', onClick: handleOk },
                  'Confirm',
                ),
              ),
          ),
      ),
    );
  };
  return import_react_dom.default.createPortal(renderDialog(), document.body);
};
var Dialog_default = Dialog;

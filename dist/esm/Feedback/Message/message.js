import React from 'react';
import { createRoot } from 'react-dom/client';
import Message from './index';
var createMessage = function createMessage(type, content, duration) {
  var container = document.createElement('div');
  document.body.appendChild(container);
  var root = createRoot(container);
  var handleClose = function handleClose() {
    root.unmount();
    document.body.removeChild(container);
  };
  var messageElement = /*#__PURE__*/ React.createElement(Message, {
    type: type,
    content: content,
    duration: duration,
    onClose: handleClose,
  });
  root.render(messageElement);
};
export default {
  success: function success(content, duration) {
    createMessage('success', content, duration);
  },
  warning: function warning(content, duration) {
    createMessage('warning', content, duration);
  },
  error: function error(content, duration) {
    createMessage('error', content, duration);
  },
  info: function info(content, duration) {
    createMessage('info', content, duration);
  },
};

import React from 'react';
import ReactDOM from 'react-dom';
import Message from './index';

type MessageType = 'success' | 'warning' | 'error' | 'info';

const createMessage = (type: MessageType, content: React.ReactNode, duration?: number) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  };

  const messageElement = React.createElement(Message, {
    type,
    content,
    duration,
    onClose: handleClose,
  });

  ReactDOM.render(messageElement, container);
};

export default {
  success: (content: React.ReactNode, duration?: number) => {
    createMessage('success', content, duration);
  },
  warning: (content: React.ReactNode, duration?: number) => {
    createMessage('warning', content, duration);
  },
  error: (content: React.ReactNode, duration?: number) => {
    createMessage('error', content, duration);
  },
  info: (content: React.ReactNode, duration?: number) => {
    createMessage('info', content, duration);
  },
};

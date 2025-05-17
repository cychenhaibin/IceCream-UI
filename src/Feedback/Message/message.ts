import React from 'react';
import { createRoot } from 'react-dom/client';
import Message from './index';

type MessageType = 'success' | 'warning' | 'error' | 'info';

const createMessage = (type: MessageType, content: React.ReactNode, duration?: number) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(container);
  };

  const messageElement = React.createElement(Message, {
    type,
    content,
    duration,
    onClose: handleClose,
  });

  root.render(messageElement);
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

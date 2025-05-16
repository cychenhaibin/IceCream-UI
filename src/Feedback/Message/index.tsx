import React, { ReactNode, useContext, useEffect, useState } from 'react';
import './index.less';
import cs from 'classnames';
import { ConfigContext } from '../../ConfigProvider';

// 消息管理器
const messageManager = {
  messages: new Set<number>(),
  listeners: new Set<() => void>(),
  getOffset: (id: number) => {
    const messages = Array.from(messageManager.messages);
    const index = messages.indexOf(id);
    return 16 + index * 60; // 顶部间距 16px，每个消息高度为 60px
  },
  add: (id: number) => {
    // 将新消息添加到 Set 的开头
    const newMessages = new Set([id, ...messageManager.messages]);
    messageManager.messages = newMessages;
    messageManager.notifyListeners();
  },
  remove: (id: number) => {
    messageManager.messages.delete(id);
    messageManager.notifyListeners();
  },
  subscribe: (listener: () => void) => {
    messageManager.listeners.add(listener);
    return () => {
      messageManager.listeners.delete(listener);
    };
  },
  notifyListeners: () => {
    messageManager.listeners.forEach(listener => listener());
  }
};

interface MessageProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  content: ReactNode;
  duration?: number;
  onClose?: () => void;
}

const Message: React.FC<MessageProps> = (props) => {
  const { type = 'info', content, duration = 3000, onClose } = props;
  const { prefix } = useContext(ConfigContext);
  const messagePrefix = prefix + '-message';
  const [visible, setVisible] = useState(true);
  const [id] = useState(() => Date.now());
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    messageManager.add(id);
    setOffset(messageManager.getOffset(id));

    const unsubscribe = messageManager.subscribe(() => {
      setOffset(messageManager.getOffset(id));
    });

    const timer = setTimeout(() => {
      setVisible(false);
      messageManager.remove(id);
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      messageManager.remove(id);
      unsubscribe();
    };
  }, [duration, onClose, id]);

  const classes = cs(messagePrefix, {
    [`${messagePrefix}-${type}`]: type,
  });

  if (!visible) return null;

  return (
    <div
      className={classes}
      style={{
        position: 'fixed',
        top: `${offset}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        transition: 'top 0.3s ease-in-out',
      }}
    >
      <div className={`${messagePrefix}-content`}>
        {content}
      </div>
    </div>
  );
};

export default Message;

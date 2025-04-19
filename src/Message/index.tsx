import React, { ReactNode, useContext, useEffect, useState } from 'react';
import './index.less';
import cs from 'classnames';
import { ConfigContext } from '../ConfigProvider';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const classes = cs(messagePrefix, {
    [`${messagePrefix}-${type}`]: type,
  });

  if (!visible) return null;

  return (
    <div className={classes}>
      <div className={`${messagePrefix}-content`}>
        {content}
      </div>
    </div>
  );
};

export default Message;

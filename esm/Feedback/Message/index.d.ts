import React, { ReactNode } from 'react';
import './index.less';
interface MessageProps {
    type?: 'success' | 'warning' | 'error' | 'info';
    content: ReactNode;
    duration?: number;
    onClose?: () => void;
}
declare const Message: React.FC<MessageProps>;
export default Message;

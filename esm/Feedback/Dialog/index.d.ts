import React from 'react';
import './index.less';
export interface DialogProps {
    visible?: boolean;
    title?: React.ReactNode;
    width?: string | number;
    top?: string | number;
    centered?: boolean;
    closable?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    keyboard?: boolean;
    destroyOnClose?: boolean;
    fullscreen?: boolean;
    draggable?: boolean;
    footer?: React.ReactNode;
    afterClose?: () => void;
    onClose?: () => void;
    onOk?: () => void;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
declare const Dialog: React.FC<DialogProps>;
export default Dialog;

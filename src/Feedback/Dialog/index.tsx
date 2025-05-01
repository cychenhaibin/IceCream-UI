import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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

const Dialog: React.FC<DialogProps> = ({
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
  const [internalVisible, setInternalVisible] = useState(visible);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setInternalVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (keyboard) {
      const handleKeyDown = (e: KeyboardEvent) => {
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
    onClose?.();
    if (destroyOnClose) {
      afterClose?.();
    }
  };

  const handleOk = () => {
    onOk?.();
  };

  const handleMaskClick = () => {
    if (maskClosable) {
      handleClose();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && draggable) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const renderDialog = () => {
    if (!internalVisible && destroyOnClose) {
      return null;
    }

    const dialogStyle: React.CSSProperties = {
      width: fullscreen ? '100%' : width,
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

    const dialogClass = classNames('ice-dialog', {
      'visible': internalVisible,
      'ice-dialog-centered': centered && !fullscreen && !draggable,
      'ice-dialog-fullscreen': fullscreen,
      'ice-dialog-draggable': draggable,
      [className || '']: !!className,
    });

    const maskClass = classNames('ice-dialog-mask', {
      'visible': internalVisible,
    });

    return (
      <div className={internalVisible ? 'ice-dialog-root visible' : 'ice-dialog-root'}>
        {mask && (
          <div
            className={maskClass}
            onClick={handleMaskClick}
          />
        )}
        <div
          ref={dialogRef}
          className={dialogClass}
          style={dialogStyle}
        >
          <div
            className="ice-dialog-header"
            onMouseDown={handleMouseDown}
          >
            <div className="ice-dialog-title">{title}</div>
            {closable && (
              <div
                className="ice-dialog-close"
                onClick={handleClose}
              >
                ×
              </div>
            )}
          </div>
          <div className="ice-dialog-content">{children}</div>
          {footer !== null && (
            <div className="ice-dialog-footer">
              {footer || (
                <>
                  <button
                    className="ice-dialog-btn ice-dialog-btn-default"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="ice-dialog-btn ice-dialog-btn-primary"
                    onClick={handleOk}
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(
    renderDialog(),
    document.body
  );
};

export default Dialog;

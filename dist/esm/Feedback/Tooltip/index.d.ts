import * as React from 'react';
import './index.less';
export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  className?: string;
  style?: React.CSSProperties;
}
declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;

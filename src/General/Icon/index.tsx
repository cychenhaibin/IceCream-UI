import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface IconProps {
  type: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

const Icon: React.FC<IconProps> = ({ type, className, style, onClick }) => {
  return (
    <i
      className={classNames('ice-icon', `ice-icon-${type}`, className)}
      style={style}
      onClick={onClick}
    />
  );
};

export default Icon;

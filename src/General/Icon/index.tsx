import './style/index.less';
import classNames from 'classnames';
import React, { FC } from 'react';

interface IconProps {
  name?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | void;
  size?: number | string;
  className?: string;
  spin?: boolean;
}

const Icon: FC<IconProps> = ({ name, size = 30, onClick, className, spin }) => {
  const styleObj = { fontSize: size };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      e.stopPropagation();
      onClick(e);
    }
  };

  const classes = classNames('iconfont', {
    [`icon-${name}`]: name,
    [`icon_${name}`]: name,
    [`icon-icon_${name}`]: name,
    [`icon-icon-${name}`]: name,
    [className || '']: className,
    'icon-spin': spin,
  });

  return <i onClick={handleClick} className={classes} style={styleObj}></i>;
};

export default Icon;

import './style/index.less';
import classNames from 'classnames';
import React, { FC } from 'react';
import { message } from 'IceCream-UI';

interface IconProps {
  name?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | void;
  size?: number | string;
}

const Icon: FC<IconProps> = ({ name, size = 30, onClick }) => {
  const styleObj = { fontSize: size };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (name) {
      navigator.clipboard
        .writeText(name)
        .then(() => {
          message.success('复制成功');
        })
        .catch(() => {
          message.error('复制失败');
        });
    }
    if (onClick) onClick(e);
  };

  const classes = classNames('iconfont', {
    [`icon-${name}`]: name,
    [`icon_${name}`]: name,
    [`icon-icon_${name}`]: name,
    [`icon-icon-${name}`]: name,
  });

  return <i onClick={handleClick} className={classes} style={styleObj}></i>;
};

export default Icon;

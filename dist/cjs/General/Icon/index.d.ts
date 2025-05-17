import './style/index.less';
import React, { FC } from 'react';
interface IconProps {
  name?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | void;
  size?: number | string;
  className?: string;
  spin?: boolean;
}
declare const Icon: FC<IconProps>;
export default Icon;

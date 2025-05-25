import React, { ReactNode, useContext, MouseEventHandler } from 'react';
import './index.less';
import cs from 'classnames';
import { ConfigContext } from '../../ConfigProvider';

interface ButtonProps {
  type?: 'highlight' | 'default';
  disabled?: boolean;
  icon?: ReactNode;
  text?: string;
  children?: ReactNode;
  className?: string;
  style?: object;
  ordertype?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  withBg?: boolean;
}
export default (props: ButtonProps) => {
  const { type, disabled, icon, text, children, className, style, onClick, ordertype, withBg } =
    props;
  // const prefix = 'IceCream-UI'
  const { prefix } = useContext(ConfigContext);
  const btnPrefix = prefix + '-btn';
  const classes = cs(
    btnPrefix,
    {
      [`${btnPrefix}-highlight`]: type === 'highlight',
      [`${btnPrefix}-disabled`]: disabled,
      [`${btnPrefix}-with-bg`]: withBg,
    },
    className,
  );

  const getTextByOrderType = () => {
    if (ordertype === 1) {
      return '已完成';
    }
    if (ordertype === 2) {
      return '已超时';
    }
    return '未完成';
  };

  return (
    <div
      className={classes}
      style={style}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick && onClick(e);
      }}
    >
      {icon}
      {text}
      {/* {getTextByOrderType()} */}
      {children}
    </div>
  );
};

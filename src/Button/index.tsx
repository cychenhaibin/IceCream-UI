import React, {ReactNode, useContext} from 'react';
import './index.less'
import cs from 'classnames'
import {ConfigContext} from "../ConfigProvider";

interface ButtonProps {
  type?: 'highlight' | 'default',
  disabled?: boolean,
  icon?: ReactNode,
  text?: string,
  children?: ReactNode,
  className?: string,
  style?: object,
  onClick?: Function,
}
export default (props:ButtonProps) => {
  const { type, disabled, icon, text, children, className, style, onClick } = props;
  // const prefix = 'IceCream-UI'
  const { prefix } = useContext(ConfigContext);
  const btnPrefix = prefix + '-btn'
  const classes = cs(btnPrefix, {
    [`${btnPrefix}-highlight`]: type === 'highlight',
    [`${btnPrefix}-disabled`]: disabled,
  },
    className
  )
  return (
    <div
      className={classes}
      style={style}
      onClick={onClick}
    >
      {icon}
      {text}
      {children}
    </div>
  )
}

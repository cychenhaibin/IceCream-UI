import React from 'react';
import './index.less';
export type InputSize = 'small' | 'default' | 'large';
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search';
export interface InputProps {
  type?: InputType;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  size?: InputSize;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
}
declare const Input: React.FC<InputProps>;
export default Input;

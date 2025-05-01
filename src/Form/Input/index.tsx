import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './index.less';

export type InputSize = 'small' | 'default' | 'large';
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search';

export interface InputProps {
  type?: InputType;                                                  // 输入框类型：文本、密码、数字等
  value?: string;                                                    // 输入框的值
  defaultValue?: string;                                             // 输入框的默认值
  placeholder?: string;                                              // 输入框的占位符
  disabled?: boolean;                                                // 是否禁用输入框
  readOnly?: boolean;                                                // 是否只读
  maxLength?: number;                                                // 最大输入长度
  minLength?: number;                                                // 最小输入长度
  prefix?: React.ReactNode;                                          // 输入框前缀
  suffix?: React.ReactNode;                                          // 输入框后缀
  allowClear?: boolean;                                              // 是否显示清除按钮
  size?: InputSize;                                                  // 输入框大小
  className?: string;                                                // 输入框的类名
  style?: React.CSSProperties;                                       // 输入框的样式
  autoFocus?: boolean;                                               // 是否自动聚焦
  onChange?: (value: string) => void;                                // 输入框值变化时的回调
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;         // 输入框聚焦时的回调
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;          // 输入框失焦时的回调
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // 按下回车键时的回调
  onSearch?: (value: string) => void;                                // 搜索时的回调
}

const Input: React.FC<InputProps> = (props) => {
  const {
    type = 'text',
    value,
    defaultValue,
    placeholder,
    disabled = false,
    readOnly = false,
    maxLength,
    minLength,
    prefix,
    suffix,
    allowClear = false,
    size = 'default',
    className,
    style,
    autoFocus = false,
    onChange,
    onFocus,
    onBlur,
    onPressEnter,
    onSearch,
  } = props;

  // 使用了 React 的 Hooks 来管理状态
  const [inputValue, setInputValue] = useState<string>(defaultValue || ''); // 输入框的值
  const [focused, setFocused] = useState<boolean>(false);                   // 是否聚焦
  const [showPassword, setShowPassword] = useState<boolean>(false);         // 是否显示密码
  const inputRef = useRef<HTMLInputElement>(null);                          // 输入框的引用

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const formatValue = (value: string): string => {
    switch (type) {
      case 'number':
        // 只允许数字和小数点
        return value.replace(/[^\d.-]/g, '');
      case 'tel':
        // 只允许数字
        return value.replace(/\D/g, '');
      case 'email':
        // 移除空格
        return value.trim();
      case 'url':
        // 移除空格
        return value.trim();
      default:
        return value;
    }
  };

  const validateValue = (value: string): boolean => {
    switch (type) {
      case 'email':
        // 验证邮箱格式
        return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'url':
        // 验证 URL 格式
        return !value || /^https?:\/\/.+/.test(value);
      default:
        return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; // 获取输入框的值
    const formattedValue = formatValue(newValue); // 格式化输入框的值

    // 处理最大长度限制
    if (maxLength && formattedValue.length > maxLength) {
      return;
    }

    // 处理最小长度限制
    if (minLength && formattedValue.length < minLength) {
      return;
    }

    if (value === undefined) {
      setInputValue(formattedValue); // 更新输入框的值
    }
    onChange?.(formattedValue); // 调用 onChange 回调
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true); // 设置聚焦状态
    onFocus?.(e); // 调用 onFocus 回调
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false); // 设置失焦状态

    if (!validateValue(inputValue)) {
      console.warn(`Invalid ${type} format`); // 如果输入值不符合格式，则打印警告
    }

    onBlur?.(e); // 调用 onBlur 回调
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e); // 调用 onPressEnter 回调
      if (type === 'search') {
        onSearch?.(inputValue); // 调用 onSearch 回调
      }
    }
  };

  const handleClear = () => {
    if (value === undefined) {
      setInputValue(''); // 如果输入框的值未定义，则清空输入框的值
    }
    onChange?.(''); // 调用 onChange 回调
    inputRef.current?.focus(); // 重新聚焦输入框
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // 切换密码显示状态
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password'; // 如果输入框类型为密码，则返回文本类型或密码类型
    }
    return type; // 返回输入框的类型
  };

  const classes = classNames(
    'ice-input-wrapper',
    {
      [`ice-input-${size}`]: size !== 'default',
      'ice-input-disabled': disabled,
      'ice-input-focused': focused,
      'ice-input-readonly': readOnly,
      'ice-input-search': type === 'search',
    },
    className
  );

  return (
    <div className={classes} style={style}>
      {prefix && <span className="ice-input-prefix">{prefix}</span>}
      <input
        ref={inputRef}            // 输入框的引用
        type={getInputType()}     // 获取输入框的类型
        value={inputValue}        // 输入框的值
        placeholder={placeholder} // 输入框的占位符
        disabled={disabled}       // 是否禁用输入框
        readOnly={readOnly}       // 是否只读
        maxLength={maxLength}     // 最大输入长度
        minLength={minLength}     // 最小输入长度
        className="ice-input"     // 输入框的类名
        onChange={handleChange}   // 输入框值变化时的回调
        onFocus={handleFocus}     // 输入框聚焦时的回调
        onBlur={handleBlur}       // 输入框失焦时的回调
        onKeyDown={handleKeyDown} // 按下回车键时的回调
      />
      {type === 'password' && (
        <span className="ice-input-password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </span>
      )}
      {allowClear && inputValue && !disabled && !readOnly && (
        <span className="ice-input-clear" onClick={handleClear}>
          ✕
        </span>
      )}
      {type === 'search' ? (
        <span className="ice-input-suffix" onClick={() => onSearch?.(inputValue)}>
          🔍
        </span>
      ) : (
        suffix && <span className="ice-input-suffix">{suffix}</span> // 输入框后缀
      )}
    </div>
  );
};

export default Input;

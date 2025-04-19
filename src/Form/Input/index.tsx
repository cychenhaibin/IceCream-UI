import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
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

  const [inputValue, setInputValue] = useState<string>(defaultValue || '');
  const [focused, setFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
        return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'url':
        return !value || /^https?:\/\/.+/.test(value);
      default:
        return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formattedValue = formatValue(newValue);

    // 处理最大长度限制
    if (maxLength && formattedValue.length > maxLength) {
      return;
    }

    // 处理最小长度限制
    if (minLength && formattedValue.length < minLength) {
      return;
    }

    if (value === undefined) {
      setInputValue(formattedValue);
    }
    onChange?.(formattedValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    if (!validateValue(inputValue)) {
      console.warn(`Invalid ${type} format`);
    }

    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e);
      if (type === 'search') {
        onSearch?.(inputValue);
      }
    }
  };

  const handleClear = () => {
    if (value === undefined) {
      setInputValue('');
    }
    onChange?.('');
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
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
        ref={inputRef}
        type={getInputType()}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        className="ice-input"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
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
        suffix && <span className="ice-input-suffix">{suffix}</span>
      )}
    </div>
  );
};

export default Input;

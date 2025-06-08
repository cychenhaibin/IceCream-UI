import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import './index.less';

export type InputNumberSize = 'small' | 'middle' | 'large';

export interface InputNumberProps {
  /** 当前值 */
  value?: number;
  /** 默认值 */
  defaultValue?: number;
  /** 变化回调 */
  onChange?: (value: number | null) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 步长 */
  step?: number;
  /** 精度 */
  precision?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 输入框尺寸 */
  size?: InputNumberSize;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const PlusIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M482 152h60v720h-60z" />
    <path d="M152 482h720v60H152z" />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M152 482h720v60H152z" />
  </svg>
);

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  step = 1,
  precision = 0,
  min = 0,
  max = Infinity,
  size = 'middle',
  prefix,
  suffix,
  className,
  style,
}) => {
  const [inputValue, setInputValue] = useState<number | null>(defaultValue ?? null);

  const currentValue = value ?? inputValue;

  const handleChange = useCallback(
    (newValue: number | null) => {
      if (disabled) return;

      if (newValue !== null) {
        // 处理精度
        if (precision > 0) {
          // 将精度转换为小数位数
          const decimalPlaces = Math.abs(Math.floor(precision));
          newValue = Number(newValue.toFixed(decimalPlaces));
        }

        // 处理最大最小值
        newValue = Math.min(Math.max(newValue, min), max);
      }

      setInputValue(newValue);
      onChange?.(newValue);
    },
    [disabled, precision, min, max, onChange],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value === '' ? null : Number(e.target.value);
      handleChange(newValue);
    },
    [handleChange],
  );

  const handleStep = useCallback(
    (direction: 'up' | 'down') => {
      if (disabled) return;

      const newValue = currentValue === null ? 0 : currentValue;
      const stepValue = direction === 'up' ? newValue + step : newValue - step;
      handleChange(stepValue);
    },
    [currentValue, step, disabled, handleChange],
  );

  const classes = classNames(
    'ice-input-number',
    `ice-input-number-${size}`,
    {
      'ice-input-number-disabled': disabled,
      'ice-input-number-with-prefix': prefix,
      'ice-input-number-with-suffix': suffix,
    },
    className,
  );

  const isDecreaseDisabled = disabled || currentValue === min;
  const isIncreaseDisabled = disabled || currentValue === max;

  return (
    <div className={classes} style={style}>
      <button
        className="ice-input-number-decrease"
        onClick={() => handleStep('down')}
        disabled={isDecreaseDisabled}
      >
        <MinusIcon />
      </button>

      {prefix && <span className="ice-input-number-prefix">{prefix}</span>}

      <input
        type="number"
        value={currentValue ?? ''}
        onChange={handleInputChange}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        className="ice-input-number-input"
      />

      {suffix && <span className="ice-input-number-suffix">{suffix}</span>}

      <button
        className="ice-input-number-increase"
        onClick={() => handleStep('up')}
        disabled={isIncreaseDisabled}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default InputNumber;

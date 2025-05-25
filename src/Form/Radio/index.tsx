import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface RadioProps {
  value?: string | number; // 单选框的值
  defaultValue?: string | number; // 默认选中的值
  disabled?: boolean; // 是否禁用
  readOnly?: boolean; // 是否只读
  name?: string; // 单选框组的名称
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义样式
  onChange?: (value: string | number) => void; // 值变化时的回调
  children?: React.ReactNode; // 子元素
  checked?: boolean; // 是否选中
  size?: 'small' | 'default' | 'large'; // 尺寸
}

export interface RadioGroupProps extends Omit<RadioProps, 'checked'> {
  options?: Array<{ label: string; value: string | number; disabled?: boolean }>; // 选项数组
  direction?: 'horizontal' | 'vertical'; // 排列方向
  children?: React.ReactNode; // 子元素
}

interface RadioComponent extends React.FC<RadioProps> {
  Group: React.FC<RadioGroupProps>;
}

const Radio: RadioComponent = (props) => {
  const {
    value,
    defaultValue,
    disabled = false,
    readOnly = false,
    name,
    className,
    style,
    onChange,
    children,
    checked: controlledChecked,
    size = 'default',
  } = props;

  const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
    defaultValue === value,
  );

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  React.useEffect(() => {
    if (value !== undefined && !isControlled) {
      setUncontrolledChecked(value === props.value);
    }
  }, [value, props.value, isControlled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    if (!isControlled) {
      setUncontrolledChecked(true);
    }
    if (onChange && value !== undefined) {
      e.preventDefault();
      e.stopPropagation();
      onChange(value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (disabled || readOnly) return;
    if (onChange && value !== undefined) {
      onChange(value);
    }
  };

  const classes = classNames(
    'ice-radio',
    {
      'ice-radio-checked': checked,
      'ice-radio-disabled': disabled,
      'ice-radio-readonly': readOnly,
      [`ice-radio-${size}`]: size !== 'default',
    },
    className,
  );

  return (
    <label className={classes} style={style} onClick={handleClick}>
      <span className="ice-radio-wrapper">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          className="ice-radio-input"
        />
        <span className="ice-radio-inner" />
      </span>
      {children && <span className="ice-radio-label">{children}</span>}
    </label>
  );
};

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    value,
    defaultValue,
    options,
    direction = 'horizontal',
    disabled = false,
    readOnly = false,
    name,
    className,
    style,
    onChange,
    size = 'default',
  } = props;

  const [selectedValue, setSelectedValue] = React.useState<string | number | undefined>(
    defaultValue,
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (value: string | number) => {
    if (disabled || readOnly) return;
    setSelectedValue(value);
    onChange?.(value);
  };

  const classes = classNames(
    'ice-radio-group',
    {
      [`ice-radio-group-${direction}`]: direction,
    },
    className,
  );

  return (
    <div className={classes} style={style} role="group" aria-label={name}>
      {options
        ? options.map((option) => (
            <Radio
              key={option.value.toString()}
              value={option.value}
              checked={selectedValue === option.value}
              disabled={disabled || option.disabled}
              readOnly={readOnly}
              name={name}
              size={size}
              onChange={() => handleChange(option.value)}
            >
              {option.label}
            </Radio>
          ))
        : React.Children.map(props.children, (child) => {
            if (React.isValidElement(child) && child.type === Radio) {
              const radioChild = child as React.ReactElement<RadioProps>;
              return React.cloneElement(radioChild, {
                checked: selectedValue === radioChild.props.value,
                disabled: disabled || radioChild.props.disabled,
                readOnly: readOnly,
                name,
                size,
                onChange: () => handleChange(radioChild.props.value!),
              });
            }
            return child;
          })}
    </div>
  );
};

Radio.Group = RadioGroup;

export default Radio;

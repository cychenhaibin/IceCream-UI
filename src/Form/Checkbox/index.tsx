import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface CheckboxProps {
  value?: string | number; // 复选框的值
  defaultValue?: string | number; // 默认选中的值
  defaultChecked?: boolean; // 初始是否选中
  disabled?: boolean; // 是否禁用
  readOnly?: boolean; // 是否只读
  name?: string; // 复选框组的名称
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义样式
  onChange?: (checked: boolean, value?: string | number) => void; // 值变化时的回调
  children?: React.ReactNode; // 子元素
  checked?: boolean; // 是否选中
  size?: 'small' | 'default' | 'large'; // 尺寸
}

export interface CheckboxGroupProps {
  options?: Array<{ label: string; value: string | number; disabled?: boolean }>; // 选项数组
  direction?: 'horizontal' | 'vertical'; // 排列方向
  children?: React.ReactNode; // 子元素
  value?: (string | number)[]; // 选中的值数组
  defaultValue?: (string | number)[]; // 默认选中的值数组
  onChange?: (values: (string | number)[]) => void; // 值变化时的回调
  disabled?: boolean; // 是否禁用
  readOnly?: boolean; // 是否只读
  name?: string; // 复选框组的名称
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义样式
  size?: 'small' | 'default' | 'large'; // 尺寸
}

interface CheckboxComponent extends React.FC<CheckboxProps> {
  Group: React.FC<CheckboxGroupProps>;
}

const Checkbox: CheckboxComponent = (props) => {
  const {
    value,
    defaultValue,
    defaultChecked = false,
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

  const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(defaultChecked);

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
      setUncontrolledChecked(e.target.checked);
    }
    if (onChange) {
      e.preventDefault();
      e.stopPropagation();
      onChange(e.target.checked, value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (disabled || readOnly) return;
    if (onChange) {
      onChange(!checked, value);
    }
  };

  const classes = classNames(
    'ice-checkbox',
    {
      'ice-checkbox-checked': checked,
      'ice-checkbox-disabled': disabled,
      'ice-checkbox-readonly': readOnly,
      [`ice-checkbox-${size}`]: size !== 'default',
    },
    className,
  );

  return (
    <label className={classes} style={style} onClick={handleClick}>
      <span className="ice-checkbox-wrapper">
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          className="ice-checkbox-input"
        />
        <span className="ice-checkbox-inner" />
      </span>
      {children && <span className="ice-checkbox-label">{children}</span>}
    </label>
  );
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
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

  const [selectedValues, setSelectedValues] = React.useState<(string | number)[]>(
    defaultValue || [],
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleChange = (optionValue: string | number, checked: boolean) => {
    if (disabled || readOnly) return;

    const newValues = checked
      ? [...selectedValues, optionValue]
      : selectedValues.filter((v) => v !== optionValue);

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const classes = classNames(
    'ice-checkbox-group',
    {
      [`ice-checkbox-group-${direction}`]: direction,
    },
    className,
  );

  return (
    <div className={classes} style={style} role="group" aria-label={name}>
      {options
        ? options.map((option) => (
            <Checkbox
              key={option.value.toString()}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              disabled={disabled || option.disabled}
              readOnly={readOnly}
              name={name}
              size={size}
              onChange={(checked) => handleChange(option.value, checked)}
            >
              {option.label}
            </Checkbox>
          ))
        : React.Children.map(props.children, (child) => {
            if (React.isValidElement(child) && child.type === Checkbox) {
              const checkboxChild = child as React.ReactElement<CheckboxProps>;
              return React.cloneElement(checkboxChild, {
                checked: selectedValues.includes(checkboxChild.props.value!),
                disabled: disabled || checkboxChild.props.disabled,
                readOnly: readOnly,
                name,
                size,
                onChange: (checked) => handleChange(checkboxChild.props.value!, checked),
              });
            }
            return child;
          })}
    </div>
  );
};

Checkbox.Group = CheckboxGroup;

export default Checkbox;

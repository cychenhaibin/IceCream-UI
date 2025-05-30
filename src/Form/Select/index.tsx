import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import Icon from '../../General/Icon';
import './index.less';

export interface SelectOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

export type SelectOptions = (SelectOption | SelectGroup)[];

export interface SelectProps {
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  options: SelectOptions;
  onChange?: (value: string | number | (string | number)[]) => void;
  onSearch?: (value: string) => void;
  onLoad?: () => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  filterable?: boolean;
  clearable?: boolean;
  size?: number;
  remoteMethod?: (query: string) => Promise<SelectOptions>;
  renderTag?: (option: SelectOption) => React.ReactNode;
  optionRenderer?: (option: SelectOption) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  locale?: {
    placeholder?: string;
    noData?: string;
    loading?: string;
  };
}

const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  options = [],
  onChange,
  onSearch,
  onLoad,
  onClear,
  placeholder = '请选择',
  disabled = false,
  loading = false,
  multiple = false,
  filterable = false,
  clearable = false,
  size = 16,
  remoteMethod,
  renderTag,
  optionRenderer,
  className,
  style,
  locale,
}) => {
  const [innerValue, setInnerValue] = useState<string | number | (string | number)[]>(() => {
    console.log('初始化值:', { value, defaultValue, multiple });
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return multiple ? [] : '';
  });

  const currentValue = value !== undefined ? value : innerValue;

  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<SelectOptions>(options);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('值变化:', { value, innerValue });
    if (value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (remoteMethod && filterable) {
      setIsLoading(true);
      remoteMethod(searchValue)
        .then((newOptions) => {
          setFilteredOptions(newOptions || []);
          setIsLoading(false);
          onLoad?.();
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else if (!remoteMethod) {
      const filtered = filterOptions(options, searchValue);
      setFilteredOptions(filtered);
    }
  }, [searchValue, remoteMethod, filterable, onLoad]);

  useEffect(() => {
    if (!remoteMethod) {
      setFilteredOptions(options);
    }
  }, [options, remoteMethod]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = (options: SelectOptions, searchValue: string): SelectOptions => {
    if (!searchValue) return options;

    return options
      .map((option) => {
        if ('options' in option) {
          return {
            ...option,
            options: option.options.filter((opt: SelectOption) =>
              String(opt.label).toLowerCase().includes(searchValue.toLowerCase()),
            ),
          };
        }
        return String(option.label).toLowerCase().includes(searchValue.toLowerCase())
          ? option
          : null;
      })
      .filter(Boolean) as SelectOptions;
  };

  const handleSelect = (selectedValue: string | number) => {
    console.log('选择值:', { selectedValue, currentValue, multiple });
    if (!selectedValue) return;

    if (multiple) {
      const newValues = Array.isArray(currentValue) ? [...currentValue] : [];
      const index = newValues.indexOf(selectedValue);
      if (index > -1) {
        newValues.splice(index, 1);
      } else {
        newValues.push(selectedValue);
      }
      if (value === undefined) {
        setInnerValue(newValues);
      }
      onChange?.(newValues);
    } else {
      if (value === undefined) {
        setInnerValue(selectedValue);
      }
      onChange?.(selectedValue);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('清除值');
    const newValue = multiple ? [] : '';
    if (value === undefined) {
      setInnerValue(newValue);
    }
    onChange?.(newValue);
    onClear?.();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const findOption = (options: SelectOptions, value: string | number): SelectOption | undefined => {
    console.log('查找选项:', { options, value });
    if (!options || !value) return undefined;

    for (const option of options) {
      if (!option) continue;

      if ('options' in option) {
        if (!option.options) continue;
        const found = option.options.find((opt: SelectOption) => {
          if (!opt) return false;
          return opt.value === value;
        });
        if (found) return found;
      } else if (option.value === value) {
        return option;
      }
    }
    return undefined;
  };

  const getSelectedLabels = () => {
    console.log('获取选中标签:', { currentValue, multiple });
    if (!currentValue || (Array.isArray(currentValue) && currentValue.length === 0)) {
      return placeholder;
    }

    if (multiple && Array.isArray(currentValue)) {
      return currentValue.map((value) => {
        if (value === undefined || value === null) return '';
        const option = findOption(filteredOptions, value);
        if (!option) return String(value);
        try {
          return optionRenderer ? optionRenderer(option) : option.label;
        } catch (error) {
          console.error('渲染选项错误:', error);
          return String(value);
        }
      });
    }

    if (currentValue === undefined || currentValue === null) {
      return placeholder;
    }

    const option = findOption(filteredOptions, currentValue as string | number);
    if (!option) return String(currentValue);
    try {
      return optionRenderer ? optionRenderer(option) : option.label;
    } catch (error) {
      console.error('渲染选项错误:', error);
      return String(currentValue);
    }
  };

  const renderOptions = () => {
    if (isLoading) {
      return (
        <div className="ice-select-loading">
          <div className="ice-select-spinner" />
          <span>{locale?.loading || '加载中...'}</span>
        </div>
      );
    }

    if (!filteredOptions || filteredOptions.length === 0) {
      return <div className="ice-select-empty">{locale?.noData || '无数据'}</div>;
    }

    return (
      <div className="ice-select-menu">
        {filteredOptions.map((option, index) => {
          if (!option) {
            console.log('renderOptions: option is undefined at index', index);
            return null;
          }

          if ('options' in option) {
            if (!option.options) {
              console.log('renderOptions: group options is undefined', option);
              return null;
            }
            return (
              <div key={index} className="ice-select-group">
                <div className="ice-select-group-title">{option.label}</div>
                {option.options.map((opt: SelectOption) => {
                  if (!opt) {
                    console.log('renderOptions: group option item is undefined');
                    return null;
                  }
                  return (
                    <div
                      key={opt.value}
                      className={classNames('ice-select-option', {
                        'ice-select-option-disabled': opt.disabled,
                        'ice-select-option-selected': Array.isArray(currentValue)
                          ? currentValue.includes(opt.value)
                          : currentValue === opt.value,
                      })}
                      onClick={() => !opt.disabled && handleSelect(opt.value)}
                    >
                      {optionRenderer ? optionRenderer(opt) : opt.label}
                    </div>
                  );
                })}
              </div>
            );
          }
          return (
            <div
              key={option.value}
              className={classNames('ice-select-option', {
                'ice-select-option-disabled': option.disabled,
                'ice-select-option-selected': Array.isArray(currentValue)
                  ? currentValue.includes(option.value)
                  : currentValue === option.value,
              })}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {optionRenderer ? optionRenderer(option) : option.label}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelectedTags = () => {
    console.log('渲染标签:', { currentValue, multiple });
    if (!multiple || !Array.isArray(currentValue) || currentValue.length === 0) {
      return null;
    }

    return currentValue.map((value) => {
      if (value === undefined || value === null) return null;

      const option = findOption(options, value);
      if (!option) return null;

      try {
        return (
          <div key={value} className="ice-select-tag">
            {renderTag ? renderTag(option) : optionRenderer ? optionRenderer(option) : option.label}
            <span
              className="ice-select-tag-close"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(value);
              }}
            >
              ×
            </span>
          </div>
        );
      } catch (error) {
        console.error('渲染标签错误:', error);
        return null;
      }
    });
  };

  const handleSelectorClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const renderSelection = () => {
    console.log('渲染选择器:', { currentValue, multiple, filterable, isOpen });
    if (filterable && isOpen) {
      return (
        <input
          ref={inputRef}
          className="ice-select-search-input"
          value={searchValue}
          onChange={handleSearch}
          placeholder={placeholder}
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }

    return (
      <div className="ice-select-selection-item">
        {multiple ? (
          <div className="ice-select-tags">
            {renderSelectedTags()}
            {Array.isArray(currentValue) && currentValue.length === 0 && (
              <span className="ice-select-placeholder">{placeholder}</span>
            )}
          </div>
        ) : (
          getSelectedLabels()
        )}
      </div>
    );
  };

  const renderDropdown = () => {
    return <div className="ice-select-dropdown">{renderOptions()}</div>;
  };

  return (
    <div
      ref={selectRef}
      className={classNames('ice-select', className, {
        'ice-select-disabled': disabled,
        'ice-select-open': isOpen,
        'ice-select-multiple': multiple,
        'ice-select-filterable': filterable,
      })}
      style={style}
    >
      <div className="ice-select-selector" onClick={handleSelectorClick}>
        {renderSelection()}
        {clearable && currentValue && !disabled && (
          <span className="ice-select-clear" onClick={handleClear}>
            ×
          </span>
        )}
        <span className="ice-select-arrow">
          <Icon name={'icon_double_screen'} size={size} />
        </span>
      </div>
      {isOpen && !disabled && <div className="ice-select-dropdown">{renderDropdown()}</div>}
    </div>
  );
};

export default Select;

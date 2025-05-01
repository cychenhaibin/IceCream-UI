import React, { useState } from 'react';
import classNames from 'classnames';
import './index.less';

export interface RateProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  texts?: string[];
  showText?: boolean;
  icon?: 'star' | 'heart';
  colors?: string[];
  lowThreshold?: number;
  highThreshold?: number;
  onChange?: (value: number) => void;
}

const Rate: React.FC<RateProps> = ({
  value,
  defaultValue = 0,
  max = 5,
  allowHalf = false,
  allowClear = false,
  disabled = false,
  readonly = false,
  texts = [],
  showText = false,
  icon = 'star',
  colors = ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
  lowThreshold = 2,
  highThreshold = 4,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number>(-1);
  const [currentValue, setCurrentValue] = useState<number>(defaultValue);

  // 获取图标字符
  const getIconCharacter = (type: string) => {
    switch (type) {
      case 'star':
        return '★';
      case 'heart':
        return '♥';
      default:
        return '★';
    }
  };

  // 获取颜色
  const getColor = (index: number) => {
    const val = hoverValue >= 0 ? hoverValue : currentValue;
    if (val <= lowThreshold) {
      return colors[0];
    } else if (val <= highThreshold) {
      return colors[1];
    }
    return colors[2];
  };

  // 处理鼠标移动
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (disabled || readonly) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;

    if (allowHalf) {
      setHoverValue(position <= 0.5 ? index - 0.5 : index);
    } else {
      setHoverValue(index);
    }
  };

  // 处理鼠标离开
  const handleMouseLeave = () => {
    setHoverValue(-1);
  };

  // 处理点击
  const handleClick = (index: number) => {
    if (disabled || readonly) return;

    const newValue = hoverValue >= 0 ? hoverValue : index;
    if (allowClear && currentValue === newValue) {
      setCurrentValue(0);
      onChange?.(0);
    } else {
      setCurrentValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div
      className={classNames('ice-rate', {
        'ice-rate-disabled': disabled,
        'ice-rate-readonly': readonly,
      })}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ice-rate-items">
        {Array.from({ length: max }, (_, i) => i + 1).map((index) => {
          const isActive = (hoverValue >= 0 ? hoverValue : currentValue) >= index;
          const isHalf = allowHalf &&
            (hoverValue >= 0 ? hoverValue : currentValue) + 0.5 === index;

          return (
            <div
              key={index}
              className={classNames('ice-rate-item', {
                'ice-rate-item-active': isActive,
                'ice-rate-item-half': isHalf,
              })}
              style={{
                color: isActive || isHalf ? getColor(index) : '#E8E8E8',
                cursor: disabled || readonly ? 'default' : 'pointer',
              }}
              onClick={() => handleClick(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              {getIconCharacter(icon)}
            </div>
          );
        })}
      </div>
      {showText && texts.length > 0 && (
        <span className="ice-rate-text">
          {texts[Math.ceil((hoverValue >= 0 ? hoverValue : currentValue) - 1)]}
        </span>
      )}
    </div>
  );
};

export default Rate;
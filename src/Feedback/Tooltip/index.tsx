import * as React from 'react';
import './index.less';
import cs from 'classnames';
import { ConfigContext } from '../../ConfigProvider';

export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  className?: string;
  style?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    title,
    children,
    placement = 'top',
    trigger = 'hover',
    className,
    style,
  } = props;

  const { prefix } = React.useContext(ConfigContext);
  const tooltipPrefix = prefix + '-tooltip';
  const [visible, setVisible] = React.useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setVisible(!visible);
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      setVisible(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  const classes = cs(tooltipPrefix, {
    [`${tooltipPrefix}-${placement}`]: placement,
    [`${tooltipPrefix}-visible`]: visible,
  });

  const wrapperClasses = cs(`${tooltipPrefix}-wrapper`, className);

  return (
    <div
      ref={triggerRef}
      className={wrapperClasses}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      {visible && (
        <div ref={tooltipRef} className={classes}>
          <div className={`${tooltipPrefix}-arrow`} />
          <div className={`${tooltipPrefix}-content`}>{title}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

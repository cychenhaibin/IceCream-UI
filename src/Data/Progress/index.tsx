import classNames from 'classnames';
import * as React from 'react';
import { Circle as RCCircle } from 'rc-progress';
import Icon from '../../General/Icon';
import omit from '../../utils/omit';
import './index.less';

export type ProgressType = 'line' | 'circle';
export type statuses = 'normal' | 'exception' | 'active' | 'success';
export type ProgressSize = 'default' | 'small';

export interface ProgressProps {
  className?: string;
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number) => React.ReactNode;
  status?: statuses;
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | string[];
  trailColor?: string;
  width?: number;
  style?: React.CSSProperties;
  size?: ProgressSize;
  steps?: number;
  children?: React.ReactNode;
}

function validProgress(percent: number | undefined) {
  if (!percent || percent < 0) {
    return 0;
  }
  if (percent > 100) {
    return 100;
  }
  return percent;
}

const Line: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeWidth,
    size,
    strokeColor,
    strokeLinecap = 'round',
    children,
    trailColor = null,
  } = props;

  const backgroundProps = {
    backgroundColor: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
  };
  const borderRadius = strokeLinecap === 'square' || strokeLinecap === 'butt' ? 0 : undefined;
  const percentStyle = {
    width: `${validProgress(percent)}%`,
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius,
    ...backgroundProps,
  };
  const trailStyle = {
    backgroundColor: trailColor || undefined,
    borderRadius,
  };
  return (
    <>
      <div className={`ci-pg-outer`}>
        <div className={`ci-pg-inner`} style={trailStyle}>
          <div className={`ci-pg-bg`} style={percentStyle} />
        </div>
      </div>
      {children}
    </>
  );
};

const Circle: React.FC<ProgressProps> = (props) => {
  const {
    strokeWidth = 6,
    trailColor = null as any,
    strokeLinecap = 'round',
    children,
    width = 120,
    strokeColor,
    percent,
    status,
  } = props;

  const wrapperClassName = classNames(`ci-pg-inner`);
  let strokeColor_ = strokeColor;
  const circleStyle = {
    width: width,
    height: width,
    fontSize: width * 0.15 + 6,
  } as React.CSSProperties;
  if (status === 'success') {
    strokeColor_ = strokeColor || '#b7eb8f';
  } else if (status === 'exception') {
    strokeColor_ = strokeColor || '#dc3545';
  }
  return (
    <div className={wrapperClassName} style={circleStyle}>
      <RCCircle
        percent={percent}
        strokeWidth={strokeWidth || 6}
        trailWidth={strokeWidth || 6}
        strokeColor={strokeColor_}
        strokeLinecap={strokeLinecap}
        trailColor={trailColor}
        prefixCls={`ci-pg`}
      />
      {children}
    </div>
  );
};

const Steps: React.FC<ProgressProps & { steps: number }> = (props) => {
  const {
    size,
    steps,
    percent = 0,
    strokeWidth = 8,
    strokeColor,
    trailColor = null as any,
    children,
  } = props;

  const current = Math.round(steps * (percent / 100));
  const stepWidth = size === 'small' ? 2 : 14;
  const styledSteps: React.ReactNode[] = new Array(steps);
  for (let i = 0; i < steps; i++) {
    const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
    styledSteps[i] = (
      <div
        key={i}
        className={classNames(`ci-pg-steps-item`, {
          [`ci-pg-steps-item-active`]: i <= current - 1,
        })}
        style={{
          backgroundColor: i <= current - 1 ? color : trailColor,
          width: stepWidth,
          height: strokeWidth,
        }}
      />
    );
  }
  return (
    <div className={`ci-pg-steps-outer`}>
      {styledSteps}
      {children}
    </div>
  );
};

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    className,
    steps,
    strokeColor,
    percent = 0,
    size = 'default',
    showInfo = true,
    type = 'line',
    status = 'normal',
    width = 120,
    ...restProps
  } = props;

  const getProgressInfo = () => {
    const { format } = props;
    if (showInfo === false) return null;
    const textFormatter = format || ((percentNumber) => `${percentNumber}%`);
    let text = textFormatter(percent);
    if (status === 'exception') text = <Icon name="mail_fail" size={16}></Icon>;
    else if (status === 'success') text = <Icon name="mail_success" size={16}></Icon>;
    return (
      <span className={`ci-pg-text`} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>
    );
  };

  let progress;
  let progressInfo = getProgressInfo();
  const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;

  if (type === 'line') {
    progress = steps ? (
      <Steps {...props} steps={steps}>
        {progressInfo}
      </Steps>
    ) : (
      <Line {...props} strokeColor={strokeColorNotArray}>
        {progressInfo}
      </Line>
    );
  } else if (type === 'circle') {
    progress = (
      <Circle {...props} strokeColor={strokeColorNotArray} status={status}>
        {progressInfo}
      </Circle>
    );
  }

  const classString = classNames(
    {
      [`ci-pg-${(steps && 'steps') || type}`]: true,
      [`ci-pg-status-${status}`]: true,
      [`ci-pg-show-info`]: showInfo,
      [`ci-pg-${size}`]: size,
    },
    className,
  );

  const circleStyle = {
    width: width,
    height: width,
    fontSize: width * 0.15 + 6,
  } as React.CSSProperties;

  return (
    <div
      {...omit(restProps, ['trailColor', 'format', 'style', 'strokeLinecap'])}
      className={classString}
      style={type === 'circle' ? circleStyle : {}}
    >
      {progress}
    </div>
  );
};

export default Progress;

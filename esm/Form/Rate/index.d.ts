import React from 'react';
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
declare const Rate: React.FC<RateProps>;
export default Rate;

import React from 'react';
import './index.less';
export interface InputTagProps {
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  maxTags?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string[]) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
declare const InputTag: React.FC<InputTagProps>;
export default InputTag;

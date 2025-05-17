import { ReactNode, MouseEventHandler } from 'react';
import './index.less';
interface ButtonProps {
    type?: 'highlight' | 'default';
    disabled?: boolean;
    icon?: ReactNode;
    text?: string;
    children?: ReactNode;
    className?: string;
    style?: object;
    ordertype?: number;
    onClick?: MouseEventHandler<HTMLDivElement>;
}
declare const _default: (props: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default _default;

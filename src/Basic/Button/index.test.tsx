/// <reference types="jest" />
import React from 'react';
import { render, screen, fireEvent, configure } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';
import { ConfigContext } from '../../ConfigProvider';

// 配置测试环境
configure({ asyncUtilTimeout: 1000 });

// Mock ConfigContext
const mockConfigContext = {
  prefix: 'IceCream-UI',
};

describe('Button 组件测试', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithContext = (ui: React.ReactElement) => {
    return render(<ConfigContext.Provider value={mockConfigContext}>{ui}</ConfigContext.Provider>);
  };

  it('默认属性渲染，内容包含 children', () => {
    renderWithContext(<Button {...defaultProps}>点击我</Button>);
    const button = screen.getByText((c) => c.includes('点击我'));
    expect(button).toBeInTheDocument();
  });

  it('高亮类型渲染，类名正确', () => {
    renderWithContext(
      <Button type="highlight" {...defaultProps}>
        高亮按钮
      </Button>,
    );
    const button = screen.getByText((c) => c.includes('高亮按钮')).closest('div');
    expect(button).toHaveClass('IceCream-UI-btn-highlight');
  });

  it('禁用状态渲染，类名正确', () => {
    renderWithContext(
      <Button disabled {...defaultProps}>
        禁用按钮
      </Button>,
    );
    const button = screen.getByText((c) => c.includes('禁用按钮')).closest('div');
    expect(button).toHaveClass('IceCream-UI-btn-disabled');
  });

  it('点击事件可用', () => {
    renderWithContext(<Button {...defaultProps}>可点击按钮</Button>);
    const button = screen.getByText((c) => c.includes('可点击按钮')).closest('div');
    fireEvent.click(button!);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('渲染带图标的按钮', () => {
    const icon = <span data-testid="test-icon">🚀</span>;
    renderWithContext(
      <Button icon={icon} {...defaultProps}>
        带图标的按钮
      </Button>,
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText((c) => c.includes('带图标的按钮'))).toBeInTheDocument();
  });

  it('应用自定义类名', () => {
    renderWithContext(
      <Button className="custom-class" {...defaultProps}>
        自定义按钮
      </Button>,
    );
    const button = screen.getByText((c) => c.includes('自定义按钮')).closest('div');
    expect(button).toHaveClass('custom-class');
  });

  it('应用自定义样式', () => {
    const customStyle = { backgroundColor: 'red' };
    renderWithContext(
      <Button style={customStyle} {...defaultProps}>
        样式按钮
      </Button>,
    );
    const button = screen.getByText((c) => c.includes('样式按钮')).closest('div');
    expect(button).toHaveStyle(customStyle);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './index';

describe('Input 组件', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('使用默认属性渲染', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('使用占位符渲染', () => {
    const placeholder = '请输入文本';
    render(<Input placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('处理值的变化', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '测试文本' } });
    expect(handleChange).toHaveBeenCalledWith('测试文本');
  });

  it('处理禁用状态', () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  it('处理只读状态', () => {
    render(<Input readOnly />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('readOnly');
  });

  it('处理最大长度限制', () => {
    const handleChange = jest.fn();
    render(<Input maxLength={5} onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '123456' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('处理最小长度限制', () => {
    const handleChange = jest.fn();
    render(<Input minLength={3} onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '12' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('处理焦点和失焦事件', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('处理回车键按下事件', () => {
    const handlePressEnter = jest.fn();
    render(<Input onPressEnter={handlePressEnter} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    expect(handlePressEnter).toHaveBeenCalled();
  });

  it('处理搜索功能', () => {
    const handleSearch = jest.fn();
    render(<Input type="search" onSearch={handleSearch} />);
    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: '搜索内容' } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    expect(handleSearch).toHaveBeenCalledWith('搜索内容');
  });

  it('处理密码可见性切换', () => {
    render(<Input type="password" />);
    const inputElement = screen.getByDisplayValue('');
    expect(inputElement).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByText('👁️‍🗨️');
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('处理清除功能', () => {
    const handleChange = jest.fn();
    render(<Input allowClear onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: '测试文本' } });
    const clearButton = screen.getByText('✕');
    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('验证邮箱格式', () => {
    const handleChange = jest.fn();
    render(<Input type="email" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'invalid-email' } });
    fireEvent.blur(inputElement);
    expect(console.warn).toHaveBeenCalledWith('Invalid email format');
  });

  it('验证URL格式', () => {
    const handleChange = jest.fn();
    render(<Input type="url" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'invalid-url' } });
    fireEvent.blur(inputElement);
    expect(console.warn).toHaveBeenCalledWith('Invalid url format');
  });

  it('渲染前缀和后缀', () => {
    render(<Input prefix={<span>前缀</span>} suffix={<span>后缀</span>} />);
    expect(screen.getByText('前缀')).toBeInTheDocument();
    expect(screen.getByText('后缀')).toBeInTheDocument();
  });

  it('应用自定义类名', () => {
    const customClass = 'custom-class';
    render(<Input className={customClass} />);
    const wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper).toHaveClass(customClass);
  });
});

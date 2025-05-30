import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Select from './index';

describe('Select', () => {
  const options = [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' },
  ];

  const groupedOptions = [
    {
      label: '分组1',
      options: [
        { value: 'option1', label: '选项1' },
        { value: 'option2', label: '选项2' },
      ],
    },
    {
      label: '分组2',
      options: [
        { value: 'option3', label: '选项3' },
        { value: 'option4', label: '选项4' },
      ],
    },
  ];

  it('renders correctly', () => {
    render(<Select options={options} />);
    expect(screen.getByText('请选择')).toBeInTheDocument();
  });

  it('shows options when clicked', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByText('请选择'));
    expect(screen.getByText('选项1')).toBeInTheDocument();
    expect(screen.getByText('选项2')).toBeInTheDocument();
    expect(screen.getByText('选项3')).toBeInTheDocument();
  });

  it('selects an option correctly', () => {
    const onChange = jest.fn();
    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.click(screen.getByText('选项1'));
    expect(onChange).toHaveBeenCalledWith('option1');
  });

  it('handles multi-select correctly', () => {
    const onChange = jest.fn();
    render(<Select options={options} isMulti onChange={onChange} />);
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.click(screen.getByText('选项1'));
    fireEvent.click(screen.getByText('选项2'));
    expect(onChange).toHaveBeenCalledWith(['option1', 'option2']);
  });

  it('handles search correctly', () => {
    render(<Select options={options} isSearchable />);
    fireEvent.click(screen.getByText('请选择'));
    const input = screen.getByPlaceholderText('请选择');
    fireEvent.change(input, { target: { value: '选项1' } });
    expect(screen.getByText('选项1')).toBeInTheDocument();
    expect(screen.queryByText('选项2')).not.toBeInTheDocument();
  });

  it('handles grouped options correctly', () => {
    render(<Select options={groupedOptions} />);
    fireEvent.click(screen.getByText('请选择'));
    expect(screen.getByText('分组1')).toBeInTheDocument();
    expect(screen.getByText('分组2')).toBeInTheDocument();
    expect(screen.getByText('选项1')).toBeInTheDocument();
    expect(screen.getByText('选项3')).toBeInTheDocument();
  });

  it('handles async loading correctly', async () => {
    const loadOptions = jest.fn().mockResolvedValue(options);
    render(<Select isSearchable loadOptions={loadOptions} />);
    fireEvent.click(screen.getByText('请选择'));
    const input = screen.getByPlaceholderText('请选择');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => {
      expect(loadOptions).toHaveBeenCalledWith('test');
    });
  });

  it('handles disabled state correctly', () => {
    render(<Select options={options} disabled />);
    const select = screen.getByText('请选择').parentElement;
    expect(select).toHaveClass('ice-select-disabled');
  });

  it('handles default value correctly', () => {
    render(<Select options={options} defaultValue="option1" />);
    expect(screen.getByText('选项1')).toBeInTheDocument();
  });

  it('handles default value in multi-select correctly', () => {
    render(<Select options={options} isMulti defaultValue={['option1', 'option2']} />);
    expect(screen.getByText('选项1, 选项2')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Radio from './index';

describe('Radio Component', () => {
  it('renders correctly with basic props', () => {
    render(<Radio>Test Radio</Radio>);
    expect(screen.getByText('Test Radio')).toBeInTheDocument();
  });

  it('handles checked state correctly', () => {
    render(<Radio checked>Test Radio</Radio>);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('handles disabled state correctly', () => {
    render(<Radio disabled>Test Radio</Radio>);
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  it('handles onChange event correctly', () => {
    const handleChange = jest.fn();
    render(
      <Radio value="test" onChange={handleChange}>
        Test Radio
      </Radio>,
    );
    const label = screen.getByText('Test Radio').parentElement;
    fireEvent.click(label!);
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  it('applies custom className correctly', () => {
    render(<Radio className="custom-class">Test Radio</Radio>);
    const label = screen.getByText('Test Radio').parentElement;
    expect(label).toHaveClass('custom-class');
  });
});

describe('RadioGroup Component', () => {
  it('renders options correctly', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(<Radio.Group options={options} name="test-group" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles value change correctly', () => {
    const handleChange = jest.fn();
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(<Radio.Group options={options} onChange={handleChange} name="test-group" />);
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('renders in vertical direction', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(<Radio.Group options={options} direction="vertical" name="test-group" />);
    const group = screen.getByRole('group');
    expect(group).toHaveClass('ice-radio-group-vertical');
  });

  it('handles disabled state for all options', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(<Radio.Group options={options} disabled name="test-group" />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('handles individual option disabled state', () => {
    const options = [
      { label: 'Option 1', value: '1', disabled: true },
      { label: 'Option 2', value: '2' },
    ];
    render(<Radio.Group options={options} name="test-group" />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeDisabled();
    expect(radios[1]).not.toBeDisabled();
  });
});

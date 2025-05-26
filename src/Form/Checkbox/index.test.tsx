import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const { container } = render(<Checkbox>Checkbox</Checkbox>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be checked when checked prop is true', () => {
    render(<Checkbox checked>Checkbox</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Checkbox disabled>Checkbox</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('should be readonly when readOnly prop is true', () => {
    render(<Checkbox readOnly>Checkbox</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('readOnly');
  });

  it('should call onChange when clicked', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange}>Checkbox</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true, undefined);
  });

  it('should not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(
      <Checkbox disabled onChange={onChange}>
        Checkbox
      </Checkbox>,
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not call onChange when readonly', () => {
    const onChange = jest.fn();
    render(
      <Checkbox readOnly onChange={onChange}>
        Checkbox
      </Checkbox>,
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('Checkbox.Group', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Checkbox.Group>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </Checkbox.Group>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders options correctly', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];
    render(<Checkbox.Group options={options} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <Checkbox.Group disabled>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </Checkbox.Group>,
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeDisabled();
    });
  });

  it('should be readonly when readOnly prop is true', () => {
    render(
      <Checkbox.Group readOnly>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </Checkbox.Group>,
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('readOnly');
    });
  });

  it('should call onChange when a checkbox is clicked', () => {
    const onChange = jest.fn();
    render(
      <Checkbox.Group onChange={onChange}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </Checkbox.Group>,
    );
    const checkbox = screen.getByLabelText('Option 1');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(['1']);
  });

  it('should not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(
      <Checkbox.Group disabled onChange={onChange}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </Checkbox.Group>,
    );
    const checkbox = screen.getByLabelText('Option 1');
    fireEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not call onChange when readonly', () => {
    const onChange = jest.fn();
    render(
      <Checkbox.Group readOnly onChange={onChange}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </Checkbox.Group>,
    );
    const checkbox = screen.getByLabelText('Option 1');
    fireEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should support vertical direction', () => {
    const { container } = render(
      <Checkbox.Group direction="vertical">
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </Checkbox.Group>,
    );
    expect(container.firstChild).toHaveClass('ice-checkbox-group-vertical');
  });
});

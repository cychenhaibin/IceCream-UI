import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputTag from './index';

// Mock @hello-pangea/dnd
jest.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Droppable: ({ children }: { children: (props: any) => React.ReactNode }) =>
    children({
      droppableProps: {},
      innerRef: jest.fn(),
      placeholder: null,
    }),
  Draggable: ({ children }: { children: (props: any) => React.ReactNode }) =>
    children({
      draggableProps: {},
      dragHandleProps: {},
      innerRef: jest.fn(),
    }),
}));

describe('InputTag', () => {
  const defaultProps = {
    placeholder: '请输入',
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onPressEnter: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<InputTag {...defaultProps} />);
    expect(screen.getByPlaceholderText('请输入')).toBeInTheDocument();
  });

  it('renders with default value', () => {
    const defaultValue = ['tag1', 'tag2'];
    render(<InputTag {...defaultProps} defaultValue={defaultValue} />);

    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('adds a tag when pressing Enter', () => {
    render(<InputTag {...defaultProps} />);

    const input = screen.getByPlaceholderText('请输入');
    fireEvent.change(input, { target: { value: 'new tag' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('new tag')).toBeInTheDocument();
    expect(defaultProps.onChange).toHaveBeenCalledWith(['new tag']);
  });

  it('removes a tag when clicking close button', () => {
    const defaultValue = ['tag1', 'tag2'];
    render(<InputTag {...defaultProps} defaultValue={defaultValue} />);

    const closeButtons = screen.getAllByText('×');
    fireEvent.click(closeButtons[0]);

    expect(screen.queryByText('tag1')).not.toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(defaultProps.onChange).toHaveBeenCalledWith(['tag2']);
  });

  it('handles disabled state correctly', () => {
    render(<InputTag {...defaultProps} disabled defaultValue={['tag1']} />);

    const input = screen.getByPlaceholderText('');
    expect(input).toBeDisabled();
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('handles readOnly state correctly', () => {
    render(<InputTag {...defaultProps} readOnly defaultValue={['tag1']} />);

    const input = screen.getByPlaceholderText('');
    expect(input).toHaveAttribute('readonly');
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('respects maxTags limit', () => {
    render(<InputTag {...defaultProps} maxTags={2} defaultValue={['tag1', 'tag2']} />);

    const input = screen.getByPlaceholderText('');
    fireEvent.change(input, { target: { value: 'tag3' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.queryByText('tag3')).not.toBeInTheDocument();
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('calls onFocus and onBlur handlers', () => {
    render(<InputTag {...defaultProps} />);

    const input = screen.getByPlaceholderText('请输入');
    fireEvent.focus(input);
    expect(defaultProps.onFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('removes last tag when pressing Backspace with empty input', () => {
    render(<InputTag {...defaultProps} defaultValue={['tag1', 'tag2']} />);

    const input = screen.getByPlaceholderText('');
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(screen.queryByText('tag2')).not.toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(defaultProps.onChange).toHaveBeenCalledWith(['tag1']);
  });

  it('handles controlled value correctly', () => {
    const { rerender } = render(<InputTag {...defaultProps} value={['tag1']} />);

    expect(screen.getByText('tag1')).toBeInTheDocument();

    rerender(<InputTag {...defaultProps} value={['tag1', 'tag2']} />);

    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Message from './index';

describe('Message Component', () => {
  beforeEach(() => {
    // 在每个测试前清除所有消息
    document.body.innerHTML = '';
  });

  it('renders message with default type (info)', () => {
    render(<Message content="Test message" />);

    const message = screen.getByText('Test message');
    expect(message).toBeInTheDocument();
    const messageContainer = message.closest('.IceCream-UI-message');
    expect(messageContainer).toHaveClass('IceCream-UI-message');
    expect(messageContainer).toHaveClass('IceCream-UI-message-info');
  });

  it('renders message with different types', () => {
    const types = ['success', 'warning', 'error', 'info'] as const;

    types.forEach((type) => {
      const { unmount } = render(<Message type={type} content={`${type} message`} />);

      const message = screen.getByText(`${type} message`);
      const messageContainer = message.closest('.IceCream-UI-message');
      expect(messageContainer).toHaveClass(`IceCream-UI-message-${type}`);
      unmount();
    });
  });

  it('renders message with custom duration', () => {
    jest.useFakeTimers();

    const onClose = jest.fn();
    render(<Message content="Test message" duration={5000} onClose={onClose} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();

    // 快进时间
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onClose).toHaveBeenCalled();
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it('renders multiple messages with correct stacking', () => {
    const messages = [
      { content: 'First message', type: 'success' as const },
      { content: 'Second message', type: 'error' as const },
      { content: 'Third message', type: 'warning' as const },
    ];

    // 按照消息管理器的行为，以相反顺序渲染消息
    messages.reverse().forEach(({ content, type }) => {
      render(<Message content={content} type={type} />);
    });

    const renderedMessages = screen.getAllByText(/message/i);
    expect(renderedMessages).toHaveLength(3);

    // 检查消息是否正确堆叠
    // 由于消息是反向渲染的，所以我们需要反向检查它们
    renderedMessages.reverse().forEach((message, index) => {
      const messageContainer = message.closest('.IceCream-UI-message');
      const expectedOffset = 16 + index * 60; // 基于实现：顶部间距16px，每个消息高度60px
      expect(messageContainer).toHaveStyle({ top: `${expectedOffset}px` });
    });
  });

  it('removes message from DOM when closed', () => {
    jest.useFakeTimers();

    const { unmount } = render(<Message content="Test message" duration={3000} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();

    // 快进时间
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    unmount();

    jest.useRealTimers();
  });

  it('cleans up timers and message manager on unmount', () => {
    jest.useFakeTimers();

    const onClose = jest.fn();
    const { unmount } = render(
      <Message content="Test message" duration={3000} onClose={onClose} />,
    );

    unmount();

    // 快进时间以确保没有定时器在运行
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onClose).not.toHaveBeenCalled();
    // 卸载后，不应该有任何消息容器残留
    expect(document.querySelector('.IceCream-UI-message')).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});

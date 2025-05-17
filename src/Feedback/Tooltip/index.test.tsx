import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from './index';

describe('Tooltip', () => {
  const defaultProps = {
    title: 'Tooltip content',
    children: <button>Hover me</button>,
  };

  const renderTooltip = (props = {}) => {
    return render(<Tooltip {...defaultProps} {...props} />);
  };

  it('renders children correctly', () => {
    renderTooltip();
    expect(screen.getByText('Hover me')).toBeTruthy();
  });

  it('shows tooltip on hover by default', () => {
    renderTooltip();
    const trigger = screen.getByText('Hover me');

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip content')).toBeTruthy();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip content')).toBeNull();
  });

  it('shows tooltip on click when trigger is click', () => {
    renderTooltip({ trigger: 'click' });
    const trigger = screen.getByText('Hover me');

    fireEvent.click(trigger);
    expect(screen.getByText('Tooltip content')).toBeTruthy();

    fireEvent.click(trigger);
    expect(screen.queryByText('Tooltip content')).toBeNull();
  });

  it('shows tooltip on focus when trigger is focus', () => {
    renderTooltip({ trigger: 'focus' });
    const trigger = screen.getByText('Hover me');

    fireEvent.focus(trigger);
    expect(screen.getByText('Tooltip content')).toBeTruthy();

    fireEvent.blur(trigger);
    expect(screen.queryByText('Tooltip content')).toBeNull();
  });

  it('applies correct placement class', () => {
    const { container } = renderTooltip({ placement: 'bottom' });
    const trigger = screen.getByText('Hover me');

    fireEvent.mouseEnter(trigger);
    const tooltip = container.querySelector('.IceCream-UI-tooltip-bottom');
    expect(tooltip).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = renderTooltip({ className: 'custom-class' });
    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = renderTooltip({ style: customStyle });
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe('red');
  });

  it('closes tooltip when clicking outside', () => {
    renderTooltip({ trigger: 'click' });
    const trigger = screen.getByText('Hover me');

    // Open tooltip
    fireEvent.click(trigger);
    expect(screen.getByText('Tooltip content')).toBeTruthy();

    // Click outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Tooltip content')).toBeNull();
  });
});

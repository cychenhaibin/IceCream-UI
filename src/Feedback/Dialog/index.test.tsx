import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from './index';

describe('Dialog Component', () => {
  beforeEach(() => {
    // Create portal root
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up portal root
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  it('should render dialog with default props', () => {
    render(<Dialog visible={true}>Content</Dialog>);

    expect(screen.getByText('标题')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.getByText('Confirm')).toBeTruthy();
  });

  it('should not be visible when visible prop is false', () => {
    render(<Dialog visible={false}>Content</Dialog>);

    const dialogRoot = document.querySelector('.ice-dialog-root');
    expect(dialogRoot?.className).not.toContain('visible');
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Dialog visible={true} onClose={onClose}>
        Content
      </Dialog>,
    );

    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onOk when confirm button is clicked', () => {
    const onOk = jest.fn();
    render(
      <Dialog visible={true} onOk={onOk}>
        Content
      </Dialog>,
    );

    fireEvent.click(screen.getByText('Confirm'));
    expect(onOk).toHaveBeenCalled();
  });

  it('should call onClose when mask is clicked and maskClosable is true', () => {
    const onClose = jest.fn();
    render(
      <Dialog visible={true} onClose={onClose} maskClosable={true}>
        Content
      </Dialog>,
    );

    const mask = document.querySelector('.ice-dialog-mask');
    fireEvent.click(mask!);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not call onClose when mask is clicked and maskClosable is false', () => {
    const onClose = jest.fn();
    render(
      <Dialog visible={true} onClose={onClose} maskClosable={false}>
        Content
      </Dialog>,
    );

    const mask = document.querySelector('.ice-dialog-mask');
    fireEvent.click(mask!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should render custom title', () => {
    render(
      <Dialog visible={true} title="Custom Title">
        Content
      </Dialog>,
    );

    expect(screen.getByText('Custom Title')).toBeTruthy();
  });

  it('should render custom footer', () => {
    render(
      <Dialog visible={true} footer={<button>Custom Footer</button>}>
        Content
      </Dialog>,
    );

    expect(screen.getByText('Custom Footer')).toBeTruthy();
    expect(screen.queryByText('Cancel')).toBeNull();
    expect(screen.queryByText('Confirm')).toBeNull();
  });

  it('should handle keyboard escape key', () => {
    const onClose = jest.fn();
    render(
      <Dialog visible={true} onClose={onClose} keyboard={true}>
        Content
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('should not handle keyboard escape key when keyboard prop is false', () => {
    const onClose = jest.fn();
    render(
      <Dialog visible={true} onClose={onClose} keyboard={false}>
        Content
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(
      <Dialog visible={true} className="custom-class">
        Content
      </Dialog>,
    );

    const dialog = document.querySelector('.ice-dialog');
    expect(dialog?.className).toContain('custom-class');
  });

  it('should apply custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <Dialog visible={true} style={customStyle}>
        Content
      </Dialog>,
    );

    const dialog = document.querySelector('.ice-dialog') as HTMLElement;
    expect(dialog?.style.backgroundColor).toBe('red');
  });

  it('should handle fullscreen mode', () => {
    render(
      <Dialog visible={true} fullscreen={true}>
        Content
      </Dialog>,
    );

    const dialog = document.querySelector('.ice-dialog');
    expect(dialog?.className).toContain('ice-dialog-fullscreen');
  });

  it('should handle centered mode', () => {
    render(
      <Dialog visible={true} centered={true}>
        Content
      </Dialog>,
    );

    const dialog = document.querySelector('.ice-dialog');
    expect(dialog?.className).toContain('ice-dialog-centered');
  });

  it('should render nested dialogs with correct z-index', () => {
    const { rerender } = render(
      <Dialog visible={true} title="First Dialog">
        <button>Open Second Dialog</button>
      </Dialog>,
    );

    const firstDialog = document.querySelector('.ice-dialog') as HTMLElement;
    expect(firstDialog?.style.zIndex).toBe('1002');

    // Render second dialog
    rerender(
      <>
        <Dialog visible={true} title="First Dialog">
          <button>Open Second Dialog</button>
        </Dialog>
        <Dialog visible={true} title="Second Dialog">
          Content
        </Dialog>
      </>,
    );

    const secondDialog = document.querySelectorAll('.ice-dialog')[1] as HTMLElement;
    expect(secondDialog?.style.zIndex).toBe('1003');
  });
});

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
// import Foo from './index';
import Button from "./index";

describe('<Button />', () => {
  it('render Foo with dumi', () => {
    const msg = 'dumi';

    render(<Button text={msg} />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});

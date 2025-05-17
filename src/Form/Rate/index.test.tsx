import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Rate from './index';

describe('Rate Component', () => {
  describe('基础功能测试', () => {
    it('应该正确渲染默认值', () => {
      render(<Rate value={3} />);
      const stars = screen.getAllByText('★');
      expect(stars).toHaveLength(5);
      expect(stars[0]).toHaveStyle({ color: 'rgb(247, 186, 42)' });
      expect(stars[1]).toHaveStyle({ color: 'rgb(247, 186, 42)' });
      expect(stars[2]).toHaveStyle({ color: 'rgb(247, 186, 42)' });
      expect(stars[3]).toHaveStyle({ color: 'rgb(232, 232, 232)' });
      expect(stars[4]).toHaveStyle({ color: 'rgb(232, 232, 232)' });
    });

    it('应该正确处理onChange回调', () => {
      const onChange = jest.fn();
      render(<Rate onChange={onChange} />);
      const stars = screen.getAllByText('★');
      fireEvent.click(stars[2]);
      expect(onChange).toHaveBeenCalledWith(3);
    });

    it('应该正确处理disabled状态', () => {
      render(<Rate disabled value={3} />);
      const stars = screen.getAllByText('★');
      fireEvent.click(stars[0]);
      // 点击不应该改变星星的状态
      expect(stars[0]).toHaveStyle({ color: 'rgb(247, 186, 42)' });
    });

    it('应该正确处理readonly状态', () => {
      render(<Rate readonly value={3} />);
      const stars = screen.getAllByText('★');
      fireEvent.click(stars[0]);
      // 点击不应该改变星星的状态
      expect(stars[0]).toHaveStyle({ color: 'rgb(247, 186, 42)' });
    });

    it('应该正确处理allowClear', () => {
      const onChange = jest.fn();
      render(<Rate value={3} allowClear onChange={onChange} />);
      const stars = screen.getAllByText('★');
      // 点击当前值应该清除评分
      fireEvent.click(stars[2]);
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });

  describe('半星功能测试', () => {
    // it('应该正确处理半星点击', () => {
    //   const onChange = jest.fn();
    //   render(<Rate allowHalf onChange={onChange} />);
    //   const stars = screen.getAllByText('★');

    //   // 模拟点击第一个星星的左半部分
    //   const firstStar = stars[0];
    //   const rect = firstStar.getBoundingClientRect();
    //   const leftHalfX = rect.left + rect.width * 0.25;

    //   fireEvent.mouseMove(firstStar, {
    //     clientX: leftHalfX,
    //     clientY: rect.top,
    //   });
    //   fireEvent.click(firstStar, {
    //     clientX: leftHalfX,
    //     clientY: rect.top,
    //   });

    //   expect(onChange).toHaveBeenCalledWith(0.5);
    // });

    it('应该正确处理半星hover效果', () => {
      render(<Rate allowHalf />);
      const stars = screen.getAllByText('★');

      // 模拟hover第一个星星的右半部分
      const firstStar = stars[0];
      const rect = firstStar.getBoundingClientRect();
      const rightHalfX = rect.left + rect.width * 0.75;

      fireEvent.mouseMove(firstStar, {
        clientX: rightHalfX,
        clientY: rect.top,
      });

      expect(firstStar).toHaveStyle({ color: 'rgb(247, 186, 42)' });
    });
  });

  describe('文本显示测试', () => {
    it('应该正确显示文本', () => {
      const texts = ['很差', '较差', '一般', '较好', '很好'];
      render(<Rate showText texts={texts} value={3} />);
      expect(screen.getByText('一般')).toBeInTheDocument();
    });

    it('应该正确处理自定义文本', () => {
      const texts = ['Bad', 'Poor', 'Normal', 'Good', 'Excellent'];
      render(<Rate showText texts={texts} value={4} />);
      expect(screen.getByText('Good')).toBeInTheDocument();
    });

    it('不应该显示文本当showText为false时', () => {
      const texts = ['Bad', 'Poor', 'Normal', 'Good', 'Excellent'];
      render(<Rate texts={texts} value={4} />);
      expect(screen.queryByText('Good')).not.toBeInTheDocument();
    });
  });

  describe('颜色阈值测试', () => {
    it('应该根据阈值正确显示颜色', () => {
      const colors = ['#FF0000', '#00FF00', '#0000FF'];
      render(<Rate colors={colors} value={1} lowThreshold={2} highThreshold={4} />);
      const stars = screen.getAllByText('★');
      expect(stars[0]).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });

    it('应该使用默认颜色当值在阈值范围内', () => {
      const colors = ['#FF0000', '#00FF00', '#0000FF'];
      render(<Rate colors={colors} value={3} lowThreshold={2} highThreshold={4} />);
      const stars = screen.getAllByText('★');
      expect(stars[0]).toHaveStyle({ color: 'rgb(0, 255, 0)' });
    });
  });

  describe('图标测试', () => {
    it('应该正确显示心形图标', () => {
      render(<Rate icon="heart" />);
      const hearts = screen.getAllByText('♥');
      expect(hearts).toHaveLength(5);
    });

    it('应该正确显示星星图标', () => {
      render(<Rate icon="star" />);
      const stars = screen.getAllByText('★');
      expect(stars).toHaveLength(5);
    });
  });
});

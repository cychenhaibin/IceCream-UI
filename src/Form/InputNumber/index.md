# InputNumber 数字输入框

通过鼠标或键盘，输入范围内的数值。

## 何时使用

- 当需要获取标准数值时。
- 当需要精确控制数值精度时。
- 当需要限制输入范围时。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => {
  return <InputNumber defaultValue={0} onChange={(value) => console.log(value)} />;
};
```

### 禁用状态

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => {
  return <InputNumber disabled defaultValue={0} />;
};
```

### 步进器

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => {
  return <InputNumber defaultValue={0} step={2} />;
};
```

### 精度

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => {
  return <InputNumber defaultValue={0.23} step={0.1} precision={2} />;
};
```

### 不同尺寸

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      <InputNumber size="small" defaultValue={0} />
      <InputNumber size="middle" defaultValue={0} />
      <InputNumber size="large" defaultValue={0} />
    </div>
  );
};
```

### 按钮位置

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => {
  return (
    <div style={{ width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <InputNumber buttonPosition="left" defaultValue={0} />
      <InputNumber buttonPosition="right" defaultValue={0} />
    </div>
  );
};
```

### 带前缀和后缀

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => {
  return (
    <div style={{ width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <InputNumber prefix="$" defaultValue={0} />
      <InputNumber suffix="%" defaultValue={0} />
    </div>
  );
};
```

## 最大值最小值

通过 `min` 和 `max` 属性可以限制输入值的范围。当达到限制时，对应的加减按钮会被禁用。

```tsx
import React from 'react';
import { InputNumber } from 'IceCream-UI';

export default () => (
  <div style={{ width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {/* 限制最小值为 0，最大值为 10 */}
    <InputNumber min={0} max={10} defaultValue={5} />

    {/* 限制最小值为 -10，最大值为 10 */}
    <InputNumber min={-10} max={10} defaultValue={0} />

    {/* 限制最小值为 0，最大值为 100，步长为 10 */}
    <InputNumber min={0} max={100} step={10} defaultValue={50} />
  </div>
);
```

## API

| 参数           | 说明       | 类型                            | 默认值   |
| -------------- | ---------- | ------------------------------- | -------- |
| value          | 当前值     | number \| null                  | -        |
| defaultValue   | 默认值     | number \| null                  | -        |
| onChange       | 变化回调   | (value: number \| null) => void | -        |
| disabled       | 是否禁用   | boolean                         | false    |
| step           | 步长       | number                          | 1        |
| precision      | 精度       | number                          | 0        |
| min            | 最小值     | number                          | 0        |
| max            | 最大值     | number                          | Infinity |
| size           | 输入框尺寸 | 'small' \| 'middle' \| 'large'  | 'middle' |
| buttonPosition | 按钮位置   | 'left' \| 'right'               | 'right'  |
| prefix         | 前缀       | ReactNode                       | -        |
| suffix         | 后缀       | ReactNode                       | -        |
| className      | 自定义类名 | string                          | -        |
| style          | 自定义样式 | CSSProperties                   | -        |

## 注意事项

1. 当 `precision` 大于 0 时，输入值会自动格式化为指定精度。
2. 当输入值超出 `min` 和 `max` 范围时，会自动限制在范围内。
3. 禁用状态下，输入框和按钮都无法操作。
4. 按钮位置可以设置在左侧或右侧，默认为右侧。
5. 支持键盘输入和按钮点击两种方式修改数值。

# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

- 当需要用户点击触发某个操作时。
- 当需要突出显示某个操作时。

## 代码演示

### 基本用法

```tsx
import React from 'react';
import { Button } from 'IceCream-UI';
import './index.less';

export default () => {
  return <Button>默认按钮</Button>;
};
```

### 不同类型

```tsx
import React from 'react';
import { Button } from 'IceCream-UI';
import './index.less';

export default () => {
  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button>默认按钮</Button>
        <Button withBg>带背景色按钮</Button>
        <Button type="highlight">高亮按钮</Button>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        <Button disabled>禁用按钮</Button>
        <Button type="highlight" disabled>
          禁用高亮按钮
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        <Button type="danger">危险按钮</Button>
        <Button type="ghost">幽灵按钮</Button>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        <Button type="link">链接按钮</Button>
        <Button type="text">文本按钮</Button>
      </div>
    </>
  );
};
```

### 带图标的按钮

```tsx
import React from 'react';
import { Button, Icon } from 'IceCream-UI';
import './index.less';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Button icon={<Icon name="search" size={14} />}>搜索</Button>
      <Button icon={<Icon name="icon_bin" size={14} />}>添加</Button>
    </div>
  );
};
```

### 按钮尺寸

```tsx
import React from 'react';
import { Button } from 'IceCream-UI';
import './index.less';

export default () => {
  return (
    <>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Button size="large">大按钮</Button>
        <Button>默认按钮</Button>
        <Button size="small">小按钮</Button>
      </div>
    </>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `highlight` \| `default` \| `primary` \| `danger` \| `ghost` \| `link` \| `text` | `default` |
| size | 按钮尺寸 | `large` \| `default` \| `small` | `default` |
| disabled | 按钮是否禁用 | `boolean` | `false` |
| icon | 设置按钮的图标 | `ReactNode` | - |
| text | 按钮文本 | `string` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `object` | - |
| withBg | 是否显示背景色 | `boolean` | `false` |
| onClick | 点击按钮时的回调函数 | `(event: MouseEvent) => void` | - |

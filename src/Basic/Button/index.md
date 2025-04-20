
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
  return (
    <Button>默认按钮</Button>
  );
};
```

### 不同类型

```tsx
import React from 'react';
import { Button } from 'IceCream-UI';
import './index.less';

export default () => {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="highlight">高亮按钮</Button>
    </div>
  );
};
```

### 禁用状态

```tsx
import React from 'react';
import { Button } from 'IceCream-UI';
import './index.less';

export default () => {
  return (
    <div>
      <Button disabled>禁用按钮</Button>
      <Button type="highlight" disabled>禁用高亮按钮</Button>
    </div>
  );
};
```

### 带图标的按钮

```tsx
import React from 'react';
import { Button } from 'IceCream-UI';
import './index.less';

export default () => {
  return (
    <Button icon={<span>🚀</span>}>
      带图标的按钮
    </Button>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | 'highlight' \| 'default' | 'default' |
| disabled | 按钮是否禁用 | boolean | false |
| icon | 设置按钮的图标 | ReactNode | - |
| text | 按钮文本 | string | - |
| className | 自定义类名 | string | - |
| style | 自定义样式 | object | - |
| onClick | 点击按钮时的回调函数 | (event: MouseEvent) => void | - |

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo

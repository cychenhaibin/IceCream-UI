# Tooltip 文字提示

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## 代码演示

### 基本用法

```jsx
import React from 'react';
import { Tooltip, Button } from 'IceCream-UI';

export default () => {
  return (
    <Tooltip title="提示文字">
      <Button>鼠标移入显示提示</Button>
    </Tooltip>
  );
};
```

### 位置

```jsx
import React from 'react';
import { Tooltip, Button } from 'IceCream-UI';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Tooltip title="上边提示" placement="top">
        <Button>上边</Button>
      </Tooltip>
      <Tooltip title="下边提示" placement="bottom">
        <Button>下边</Button>
      </Tooltip>
      <Tooltip title="左边提示" placement="left">
        <Button>左边</Button>
      </Tooltip>
      <Tooltip title="右边提示" placement="right">
        <Button>右边</Button>
      </Tooltip>
    </div>
  )
}
```

### 触发方式

```jsx
import React from 'react';
import { Tooltip, Button, Input } from 'IceCream-UI';

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <Tooltip title="鼠标移入显示" trigger="hover">
        <Button>hover</Button>
      </Tooltip>
      <Tooltip title="点击显示" trigger="click">
        <Button>click</Button>
      </Tooltip>
      <Tooltip title="获得焦点显示" trigger="focus">
        <Input>focus</Input>
      </Tooltip>
    </div>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 提示文字 | ReactNode | - |
| placement | 气泡框位置 | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' |
| trigger | 触发行为 | 'hover' \| 'click' \| 'focus' | 'hover' |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

## 注意事项

1. Tooltip 组件支持四种位置：上、下、左、右
2. 支持三种触发方式：hover、click、focus
3. 提示框内容支持 ReactNode，可以自定义样式
4. 提示框会自动计算位置，避免超出可视区域
5. 提示框有平滑的动画效果
6. 支持自定义样式和类名
7. 支持无障碍访问 

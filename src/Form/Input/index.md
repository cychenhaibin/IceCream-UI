---
title: Input 输入框
navigation:
  title: Input
  group: 数据录入
---
# Input

[//]: # (## Input 输入框)

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 代码演示
### 基本使用

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input placeholder="请输入内容" />
    </div>
  );
};
```

### 不同大小

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input size="small" placeholder="小尺寸" />
      <Input placeholder="默认尺寸" />
      <Input size="large" placeholder="大尺寸" />
    </div>
  );
};
```

### 前置/后置标签

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input prefix="￥" suffix="RMB" placeholder="请输入金额" />
      <Input prefix="🔍" placeholder="搜索" />
      <Input suffix=".com" placeholder="请输入网址" />
    </div>
  );
};
```

### 搜索框

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  const handleSearch = (value: string) => {
    console.log('搜索值:', value);
  };

  return (
    <div className="ice-input-demo">
      <Input type="search" placeholder="搜索..." onSearch={handleSearch} />
    </div>
  );
};
```

### 密码框

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input type="password" placeholder="请输入密码" />
    </div>
  );
};
```

### 数字输入框

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input type="number" placeholder="请输入数字" />
    </div>
  );
};
```

### 邮箱输入框

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input type="email" placeholder="请输入邮箱" />
    </div>
  );
};
```

### 网址输入框

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input type="url" placeholder="请输入网址" />
    </div>
  );
};
```

### 电话输入框

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input type="tel" placeholder="请输入电话号码" />
    </div>
  );
};
```

### 禁用状态

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input disabled placeholder="禁用状态" />
    </div>
  );
};
```

### 只读状态

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input readOnly value="只读内容" />
    </div>
  );
};
```

### 带清除按钮

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input allowClear placeholder="请输入内容" />
    </div>
  );
};
```

### 自动聚焦

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input autoFocus placeholder="自动聚焦" />
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 声明 input 类型 | `'text' \| 'password' \| 'number' \| 'email' \| 'tel' \| 'url' \| 'search'` | `'text'` |
| value | 输入框内容 | `string` | - |
| defaultValue | 输入框默认内容 | `string` | - |
| placeholder | 输入框提示文本 | `string` | - |
| disabled | 是否禁用状态 | `boolean` | `false` |
| readOnly | 是否只读状态 | `boolean` | `false` |
| maxLength | 最大长度 | `number` | - |
| minLength | 最小长度 | `number` | - |
| prefix | 带有前缀图标的 input | `React.ReactNode` | - |
| suffix | 带有后缀图标的 input | `React.ReactNode` | - |
| allowClear | 可以点击清除图标删除内容 | `boolean` | `false` |
| size | 输入框大小 | `'small' \| 'default' \| 'large'` | `'default'` |
| className | 输入框类名 | `string` | - |
| style | 输入框样式 | `React.CSSProperties` | - |
| autoFocus | 自动获取焦点 | `boolean` | `false` |
| onChange | 输入框内容变化时的回调 | `(value: string) => void` | - |
| onFocus | 输入框获得焦点时的回调 | `(e: React.FocusEvent<HTMLInputElement>) => void` | - |
| onBlur | 输入框失去焦点时的回调 | `(e: React.FocusEvent<HTMLInputElement>) => void` | - |
| onPressEnter | 按下回车的回调 | `(e: React.KeyboardEvent<HTMLInputElement>) => void` | - |
| onSearch | 点击搜索按钮的回调 | `(value: string) => void` | - | 

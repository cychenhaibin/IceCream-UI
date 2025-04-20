# Input 输入框

[//]: # (## Input 输入框)

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 代码演示
### 基本使用

最简单的用法，展示了一个基本的输入框。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} placeholder="请输入内容" />
    </div>
  );
};
```

### 不同大小

输入框定义了三种尺寸（大、默认、小），高度分别为 40px、32px 和 24px。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} size="small" placeholder="小尺寸" />
      <Input style={{ width: '300px' }} placeholder="默认尺寸" />
      <Input style={{ width: '300px' }} size="large" placeholder="大尺寸" />
    </div>
  );
};
```

### 前置/后置标签

在输入框上添加前缀或后缀图标，可以用于展示输入框的用途或单位。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} prefix="￥" suffix="RMB" placeholder="请输入金额" />
      <Input style={{ width: '300px' }} prefix="🔍" placeholder="搜索" />
      <Input style={{ width: '300px' }} suffix=".com" placeholder="请输入网址" />
    </div>
  );
};
```

### 搜索框

带有搜索按钮的输入框，点击搜索按钮会触发 `onSearch` 回调。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  const handleSearch = (value: string) => {
    console.log('搜索值:', value);
  };

  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} type="search" placeholder="搜索..." onSearch={handleSearch} />
    </div>
  );
};
```

### 密码框

密码框，可以切换密码的显示和隐藏。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} type="password" placeholder="请输入密码" />
    </div>
  );
};
```

### 数字输入框

数字输入框，只允许输入数字，可以设置最大值和最小值。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} type="number" placeholder="请输入数字" />
    </div>
  );
};
```

### 邮箱输入框

邮箱输入框，会自动验证输入内容是否符合邮箱格式。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} type="email" placeholder="请输入邮箱" />
    </div>
  );
};
```

### 网址输入框

网址输入框，会自动验证输入内容是否符合 URL 格式。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} type="url" placeholder="请输入网址" />
    </div>
  );
};
```

### 电话输入框

电话输入框，会自动过滤非数字字符，保持纯数字格式。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} type="tel" placeholder="请输入电话号码" />
    </div>
  );
};
```

### 禁用状态

禁用状态的输入框，不可输入，显示为灰色。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} disabled placeholder="禁用状态" />
    </div>
  );
};
```

### 只读状态

只读状态的输入框，不可输入，但可以复制内容。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} readOnly value="只读内容" />
    </div>
  );
};
```

### 带清除按钮

带清除按钮的输入框，点击清除按钮可以清空输入内容。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} allowClear placeholder="请输入内容" />
    </div>
  );
};
```

### 自动聚焦

自动聚焦的输入框，页面加载完成后自动获得焦点。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      <Input style={{ width: '300px' }} autoFocus placeholder="自动聚焦" />
    </div>
  );
};
```

### 自定义宽度

Input 组件支持通过 `style` 或 `className` 自定义宽度。

```tsx
import React from 'react';
import { Input } from 'IceCream-UI';

export default () => {
  return (
    <div className="ice-input-demo">
      {/* 通过 style 设置固定宽度 */}
      <Input style={{ width: '300px' }} placeholder="固定宽度 300px" />
      
      {/* 通过 style 设置百分比宽度 */}
      <div style={{ width: '50%' }}>
        <Input placeholder="父容器宽度 50%" />
      </div>
      
      {/* 通过 className 设置宽度 */}
      <Input className="custom-width" placeholder="自定义类名设置宽度" />
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

# Checkbox 复选框

复选框组件。

## 代码演示

### 基础用法

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';

export default () => <Checkbox>Checkbox</Checkbox>;
```

### 受控组件

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';
import { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={(checked) => setChecked(checked)}>
      Checkbox
    </Checkbox>
  );
};
```

### 禁用状态

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';

export default () => (
  <>
    <Checkbox disabled>Disabled</Checkbox>
    <Checkbox disabled checked>
      Disabled Checked
    </Checkbox>
  </>
);
```

### 只读状态

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';

export default () => (
  <>
    <Checkbox readOnly>ReadOnly</Checkbox>
    <Checkbox readOnly checked>
      ReadOnly Checked
    </Checkbox>
  </>
);
```

### 不同尺寸

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';

export default () => (
  <>
    <Checkbox size="small">Small</Checkbox>
    <Checkbox>Default</Checkbox>
    <Checkbox size="large">Large</Checkbox>
  </>
);
```

### 复选框组

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';

export default () => (
  <Checkbox.Group>
    <Checkbox value="1">Option 1</Checkbox>
    <Checkbox value="2">Option 2</Checkbox>
    <Checkbox value="3">Option 3</Checkbox>
  </Checkbox.Group>
);
```

### 垂直排列

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';

export default () => (
  <Checkbox.Group direction="vertical">
    <Checkbox value="1">Option 1</Checkbox>
    <Checkbox value="2">Option 2</Checkbox>
    <Checkbox value="3">Option 3</Checkbox>
  </Checkbox.Group>
);
```

### 使用 options

```jsx
import React from 'react';
import { Checkbox } from 'IceCream-UI';

export default () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return <Checkbox.Group options={options} />;
};
```

## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 指定当前是否选中 | `boolean` | - |
| defaultChecked | 初始是否选中 | `boolean` | - |
| disabled | 是否禁用 | `boolean` | false |
| readOnly | 是否只读 | `boolean` | false |
| value | 复选框的值 | `string` \| `number` | - |
| onChange | 变化时回调函数 | `(checked: boolean, value?: string \| number) => void` | - |
| size | 尺寸 | `small` \| `default` \| `large` | default |

### Checkbox.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 指定选中的选项 | `(string \| number)[]` | - |
| defaultValue | 默认选中的选项 | `(string \| number)[]` | - |
| options | 指定可选项 | `{ label: string; value: string \| number; disabled?: boolean }[]` | - |
| disabled | 是否禁用 | `boolean` | false |
| readOnly | 是否只读 | `boolean` | false |
| direction | 排列方向 | `horizontal` \| `vertical` | horizontal |
| onChange | 变化时回调函数 | `(values: (string \| number)[]) => void` | - |
| size | 尺寸 | `small` \| `default` \| `large` | default |

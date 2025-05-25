# Radio 单选框

单选框组件，用于在多个选项中选择一个。

## 何时使用

- 用于在多个互斥选项中选择一个
- 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多

## 代码演示

### 基础用法

最简单的用法。

```tsx
import React from 'react';
import { Radio } from 'IceCream-UI';

export default () => {
  return <Radio>Option</Radio>;
};
```

### 单选框组

一组互斥的 Radio 配合使用。

```tsx
import React from 'react';
import { Radio } from 'IceCream-UI';

export default () => {
  return (
    <Radio.Group defaultValue="1">
      <Radio value="1">Option1</Radio>
      <Radio value="2">Option2</Radio>
      <Radio value="3">Option3</Radio>
    </Radio.Group>
  );
};
```

### 垂直布局

垂直排列的单选框组。

```tsx
import React from 'react';
import { Radio } from 'IceCream-UI';

export default () => {
  return (
    <Radio.Group defaultValue="1" direction="vertical">
      <Radio value="1">Option1</Radio>
      <Radio value="2">Option2</Radio>
      <Radio value="3">Option3</Radio>
    </Radio.Group>
  );
};
```

### 禁用状态

单选框的禁用状态。

```tsx
import React from 'react';
import { Radio } from 'IceCream-UI';

export default () => {
  return (
    <>
      <Radio disabled>disabled</Radio>
      <Radio.Group disabled defaultValue="1">
        <Radio value="1">Option1</Radio>
        <Radio value="2">Option2</Radio>
      </Radio.Group>
    </>
  );
};
```

### 只读状态

单选框的只读状态。

```tsx
import React from 'react';
import { Radio } from 'IceCream-UI';

export default () => {
  return (
    <>
      <Radio readOnly>onlyRead</Radio>
      <Radio.Group readOnly defaultValue="1">
        <Radio value="1">Option1</Radio>
        <Radio value="2">Option2</Radio>
      </Radio.Group>
    </>
  );
};
```

### 不同尺寸

单选框有三种尺寸：大、默认、小。可以通过 `size` 属性来设置。

```tsx
import React from 'react';
import { Radio } from 'IceCream-UI';

export default () => {
  return (
    <div>
      <div>
        <Radio.Group size="small" defaultValue="1">
          <Radio value="1">Option1</Radio>
          <Radio value="2">Option2</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginTop: 16 }}>
        <Radio.Group defaultValue="1">
          <Radio value="1">Option1</Radio>
          <Radio value="2">Option2</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginTop: 16 }}>
        <Radio.Group size="large" defaultValue="1">
          <Radio value="1">Option1</Radio>
          <Radio value="2">Option2</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};
```

### 选项数组

通过 `options` 属性来设置选项数组。

```tsx
import React from 'react';
import { Radio } from 'IceCream-UI';

export default () => {
  const options = [
    { label: 'Option1', value: '1' },
    { label: 'Option2', value: '2' },
    { label: 'Option3', value: '3', disabled: true },
  ];

  return <Radio.Group options={options} defaultValue="1" />;
};
```

## API

### Radio

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | - |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 禁用 Radio | boolean | false |
| readOnly | 只读 Radio | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | string \| number | - |
| size | 单选框大小 | 'small' \| 'default' \| 'large' | 'default' |
| onChange | 变化时回调函数 | (value: string \| number) => void | - |

### Radio.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的值 | string \| number | - |
| disabled | 禁用所有单选框 | boolean | false |
| readOnly | 只读所有单选框 | boolean | false |
| name | RadioGroup 下所有 input 的 name 属性 | string | - |
| options | 指定可选项 | Array<{ label: string; value: string \| number; disabled?: boolean }> | - |
| size | 单选框大小 | 'small' \| 'default' \| 'large' | 'default' |
| value | 用于设置当前选中的值 | string \| number | - |
| onChange | 选项变化时的回调函数 | (value: string \| number) => void | - |
| direction | 排列方向 | 'horizontal' \| 'vertical' | 'horizontal' |

## 注意事项

1. Radio 组件支持受控和非受控两种模式
2. RadioGroup 中的 Radio 会自动继承 RadioGroup 的 disabled、readOnly 和 size 属性
3. 当使用 options 属性时，RadioGroup 会自动渲染选项，不需要手动添加 Radio 子组件
4. 垂直布局时，RadioGroup 会自动调整间距，确保选项之间有合适的间隔

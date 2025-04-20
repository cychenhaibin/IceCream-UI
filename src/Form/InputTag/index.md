# InputTag 标签输入框

标签输入框组件，支持输入标签、删除标签和拖拽排序。

## 何时使用

- 需要输入多个标签时
- 需要展示多个标签时
- 需要管理标签的增删时
- 需要对标签进行排序时

## 代码演示

### 基本用法

```jsx
import React, { useState } from 'react';
import { InputTag } from 'IceCream-UI';

export default () => {
  const [tags, setTags] = useState([]);

  return (
    <InputTag
      value={tags}
      onChange={setTags}
      placeholder="请输入标签"
    />
  );
};
```

### 拖拽排序

```jsx
import React, { useState } from 'react';
import { InputTag } from 'IceCream-UI';

export default () => {
  const [tags, setTags] = useState(['标签1', '标签2', '标签3']);

  return (
    <InputTag
      value={tags}
      onChange={setTags}
      placeholder="请输入标签"
    />
  );
};
```

### 禁用状态

```jsx
import React from 'react';
import { InputTag } from 'IceCream-UI';

export default () => (
  <InputTag
    defaultValue={['标签1', '标签2']}
    disabled
  />
);
```

### 只读状态

```jsx
import React from 'react';
import { InputTag } from 'IceCream-UI';

export default () => (
  <InputTag
    defaultValue={['标签1', '标签2']}
    readOnly
  />
);
```

### 限制标签数量

```jsx
import React from 'react';
import { InputTag } from 'IceCream-UI';

export default () => (
  <InputTag
    maxTags={3}
    placeholder="最多输入3个标签"
  />
);
```

### 限制输入长度

```jsx
import React from 'react';
import { InputTag } from 'IceCream-UI';

export default () => (
  <InputTag
    maxLength={10}
    placeholder="每个标签最多10个字符"
  />
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 标签值 | `string[]` | - |
| defaultValue | 默认标签值 | `string[]` | `[]` |
| placeholder | 输入框占位文本 | `string` | 请输入 |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 是否只读 | `boolean` | `false` |
| maxLength | 输入框最大字符数 | `number` | - |
| maxTags | 最大标签数量 | `number` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onChange | 标签值变化时的回调 | `(value: string[]) => void` | - |
| onFocus | 输入框获得焦点时的回调 | `(e: FocusEvent) => void` | - |
| onBlur | 输入框失去焦点时的回调 | `(e: FocusEvent) => void` | - |
| onPressEnter | 按下回车键时的回调 | `(e: KeyboardEvent) => void` | - |

## 注意事项

1. 按回车键添加标签
2. 按退格键删除最后一个标签
3. 点击标签上的关闭按钮删除对应标签
4. 支持拖拽排序（在非禁用和只读状态下）
5. 支持键盘操作
6. 支持禁用和只读状态
7. 支持限制标签数量和输入长度
8. 支持自定义样式
9. 支持无障碍访问 

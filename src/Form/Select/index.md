# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选。

```tsx
import React from 'react';
import { Select } from 'IceCream-UI';

const options = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' },
];

export default () => (
  <Select
    style={{ width: '50%' }}
    options={options}
    placeholder="请选择"
    onChange={(value) => console.log('selected value:', value)}
  />
);
```

## 禁用状态

选择器不可用状态。

```tsx
import React from 'react';
import { Select } from 'IceCream-UI';

const options = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2', disabled: true },
  { value: '3', label: '选项3' },
];

export default () => (
  <>
    <Select style={{ width: '50%' }} options={options} disabled placeholder="禁用状态" />
    <br />
    <br />
    <Select style={{ width: '50%' }} options={options} placeholder="选项2被禁用" />
  </>
);
```

## 可清空单选

包含清空按钮，可将选择器清空为初始状态。

```tsx
import React from 'react';
import { Select } from 'IceCream-UI';

const options = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' },
];

export default () => (
  <Select
    style={{ width: '50%' }}
    options={options}
    clearable
    placeholder="请选择"
    onChange={(value) => console.log('selected value:', value)}
  />
);
```

## 多选

适用性较广的基础多选，用 Tag 展示已选项。

```tsx
import React from 'react';
import { Select } from 'IceCream-UI';

const options = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' },
];

export default () => (
  <Select
    style={{ width: '50%' }}
    options={options}
    multiple
    placeholder="请选择"
    onChange={(value) => console.log('selected values:', value)}
  />
);
```

## 分组

备选项进行分组展示。

```tsx
import React from 'react';
import { Select } from 'IceCream-UI';

const options = [
  {
    label: '热门城市',
    options: [
      { value: 'Shanghai', label: '上海' },
      { value: 'Beijing', label: '北京' },
    ],
  },
  {
    label: '城市名',
    options: [
      { value: 'Chengdu', label: '成都' },
      { value: 'Shenzhen', label: '深圳' },
      { value: 'Guangzhou', label: '广州' },
      { value: 'Dalian', label: '大连' },
    ],
  },
];

export default () => (
  <Select
    style={{ width: '50%' }}
    options={options}
    placeholder="请选择"
    onChange={(value) => console.log('selected value:', value)}
  />
);
```

## 可搜索

可以利用搜索功能快速查找选项。

```tsx
import React from 'react';
import { Select } from 'IceCream-UI';

const options = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' },
];

export default () => (
  <Select
    style={{ width: '50%' }}
    options={options}
    filterable
    placeholder="请选择"
    onChange={(value) => console.log('selected value:', value)}
  />
);
```

## 远程搜索

从服务器搜索数据，输入关键字进行查找。

```tsx
import React from 'react';
import { Select } from 'IceCream-UI';

const remoteMethod = (query: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' },
      ].filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
      resolve(options);
    }, 200);
  });
};

export default () => (
  <Select
    style={{ width: '50%' }}
    filterable
    remoteMethod={remoteMethod}
    placeholder="请输入关键词"
    onChange={(value) => console.log('selected value:', value)}
  />
);
```

## 自定义选项

可以自定义备选项的渲染内容。

```tsx
import React from 'react';
import { Select, SelectOption } from 'IceCream-UI';

interface CustomSelectOption extends SelectOption {
  desc?: string;
}

const options: CustomSelectOption[] = [
  { value: '1', label: '选项1', desc: '描述1' },
  { value: '2', label: '选项2', desc: '描述2' },
  { value: '3', label: '选项3', desc: '描述3' },
];

// 用于下拉选项的渲染
const CustomOption = ({ option }: { option: SelectOption }) => {
  if (!option || !option.label) return null;

  const customOption = option as CustomSelectOption;
  return (
    <div className="ice-select-option-content">
      <div className="ice-select-option-content-label">{customOption.label}</div>
      <div className="ice-select-option-content-desc">{customOption.desc}</div>
    </div>
  );
};

const Demo = () => {
  const [value, setValue] = React.useState<string | number>('');

  return (
    <Select
      style={{ width: '50%' }}
      options={options}
      value={value}
      optionRenderer={(option) => <CustomOption option={option} />}
      renderTag={(option) => <span>{option.label}</span>}
      placeholder="请选择"
      onChange={(val) => {
        setValue(val);
      }}
      filterable
    />
  );
};

export default Demo;
```

## API

### Select Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值 | `string \| number \| (string \| number)[]` | - |
| defaultValue | 默认选中的值 | `string \| number \| (string \| number)[]` | - |
| options | 选项数组 | `SelectOptions` | `[]` |
| onChange | 选中值发生变化时触发 | `(value: string \| number \| (string \| number)[]) => void` | - |
| onSearch | 搜索值变化时触发 | `(value: string) => void` | - |
| onLoad | 远程加载完成时触发 | `() => void` | - |
| onClear | 清空选择时触发 | `() => void` | - |
| placeholder | 选择框默认文字 | `string` | 请选择 |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| filterable | 是否可搜索 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| remoteMethod | 远程搜索方法 | `(query: string) => Promise<SelectOptions>` | - |
| renderTag | 自定义标签渲染函数 | `(option: SelectOption) => React.ReactNode` | - |
| optionRenderer | 自定义选项渲染函数 | `(option: SelectOption) => React.ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| locale | 语言包配置 | `{ placeholder?: string; noData?: string; loading?: string; }` | - |

### SelectOption

| 参数     | 说明           | 类型               | 默认值  |
| -------- | -------------- | ------------------ | ------- |
| value    | 选项的值       | `string \| number` | -       |
| label    | 选项的标签     | `React.ReactNode`  | -       |
| disabled | 是否禁用该选项 | `boolean`          | `false` |

### SelectGroup

| 参数     | 说明           | 类型             | 默认值  |
| -------- | -------------- | ---------------- | ------- |
| label    | 分组的标签     | `string`         | -       |
| options  | 分组的选项     | `SelectOption[]` | -       |
| disabled | 是否禁用该分组 | `boolean`        | `false` |

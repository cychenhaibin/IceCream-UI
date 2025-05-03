# Tree 树形控件组件

一个功能丰富的树形控件，支持选择、懒加载、过滤、手风琴、拖拽等。

## 主要特性

- 基础用法
- 可选择（单选/多选）
- 懒加载自定义叶子节点，支持多次懒加载和失败重试
- 禁用复选框
- 默认展开、默认选中
- 节点选择、复选框选择
- 节点过滤
- 手风琴模式（同级只展开一个）
- 可拖拽节点

## API

### Tree Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树数据 | TreeNode[] | - |
| checkable | 是否显示复选框 | boolean | false |
| selectable | 是否可选中节点 | boolean | true |
| multiple | 是否多选 | boolean | false |
| defaultExpandedKeys | 默认展开的节点 key 数组 | string[] | [] |
| defaultCheckedKeys | 默认勾选的节点 key 数组 | string[] | [] |
| defaultSelectedKeys | 默认选中的节点 key 数组 | string[] | [] |
| loadData | 懒加载函数，返回 Promise<TreeNode[]> | (node) => Promise<TreeNode[]> | - |
| onSelect | 选中节点回调 | (keys, info) => void | - |
| onCheck | 勾选节点回调 | (keys, info) => void | - |
| filterTreeNode | 节点过滤函数 | (node) => boolean | - |
| accordion | 手风琴模式 | boolean | false |
| draggable | 是否可拖拽节点 | boolean | false |

### TreeNode

| 属性      | 说明           | 类型       |
| --------- | -------------- | ---------- |
| key       | 唯一标识       | string     |
| title     | 节点内容       | ReactNode  |
| children  | 子节点         | TreeNode[] |
| isLeaf    | 是否为叶子节点 | boolean    |
| checkable | 是否可勾选     | boolean    |
| disabled  | 是否禁用       | boolean    |

## 用法示例

### 基础用法

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';

const data = [
  {
    key: '1',
    title: '一级 1',
    children: [
      { key: '1-1', title: '二级 1-1', isLeaf: true },
      { key: '1-2', title: '二级 1-2', isLeaf: true },
    ],
  },
  { key: '2', title: '一级 2', isLeaf: true },
];
export default () => {
  return <Tree data={data} />;
};
```

### 可选择/多选

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
const data = [
  {
    key: '1',
    title: '一级 1',
    children: [
      { key: '1-1', title: '二级 1-1', isLeaf: true },
      { key: '1-2', title: '二级 1-2', isLeaf: true },
    ],
  },
  { key: '2', title: '一级 2', isLeaf: true },
];
export default () => {
  return <Tree data={data} checkable multiple />;
};
```

### 懒加载自定义叶子节点

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
const data = [
  {
    key: '1',
    title: '一级 1',
    children: [
      { key: '1-1', title: '二级 1-1', isLeaf: true },
      { key: '1-2', title: '二级 1-2', isLeaf: true },
    ],
  },
  { key: '2', title: '一级 2', isLeaf: true },
];
export default () => {
  return (
    <Tree
      data={data}
      loadData={async (node) => {
        // 模拟异步加载
        await new Promise((r) => setTimeout(r, 1000));
        if (node.key === '1') {
          return [{ key: '1-3', title: '二级 1-3', isLeaf: true }];
        }
        return [];
      }}
    />
  );
};
```

### 禁用复选框

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
const data = [
  {
    key: '1',
    title: '一级',
    checkable: false,
    children: [{ key: '1-1', title: '二级', isLeaf: true }],
  },
];
export default () => {
  return <Tree data={data} checkable />;
};
```

### 默认展开/选中

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
const data = [
  {
    key: '1',
    title: '一级 1',
    children: [
      { key: '1-1', title: '二级 1-1', isLeaf: true },
      { key: '1-2', title: '二级 1-2', isLeaf: true },
    ],
  },
  { key: '2', title: '一级 2', isLeaf: true },
];
export default () => {
  return <Tree data={data} defaultExpandedKeys={['1']} defaultSelectedKeys={['1-1']} />;
};
```

### 节点过滤

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
const data = [
  {
    key: '1',
    title: '一级 1',
    children: [
      { key: '1-1', title: '二级 1-1', isLeaf: true },
      { key: '1-2', title: '二级 1-2', isLeaf: true },
    ],
  },
  { key: '2', title: '一级 2', isLeaf: true },
];
export default () => {
  return <Tree data={data} filterTreeNode={(node) => node.title.includes('1')} />;
};
```

### 手风琴模式

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
const data = [
  {
    key: '1',
    title: '一级 1',
    children: [
      { key: '1-1', title: '二级 1-1', isLeaf: true },
      { key: '1-2', title: '二级 1-2', isLeaf: true },
    ],
  },
  { key: '2', title: '一级 2', isLeaf: true },
];
export default () => {
  return <Tree data={data} accordion />;
};
```

### 可拖拽节点

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
const data = [
  {
    key: '1',
    title: '一级 1',
    children: [
      { key: '1-1', title: '二级 1-1', isLeaf: true },
      { key: '1-2', title: '二级 1-2', isLeaf: true },
    ],
  },
  { key: '2', title: '一级 2', isLeaf: true },
];
export default () => {
  return <Tree data={data} draggable />;
};
```

---

如需更多用法，请参考源码或联系开发者。

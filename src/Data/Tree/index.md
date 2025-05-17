# Tree 树形控件

树形控件用于展示层级结构的数据。

## 何时使用

- 当需要展示层级结构的数据时，如文件夹、组织架构等。
- 当需要选择、展开/收起、拖拽等交互操作时。
- 当数据量较大，需要懒加载时。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
      children: [
        {
          key: '1-1',
          title: '节点 1-1',
        },
        {
          key: '1-2',
          title: '节点 1-2',
        },
      ],
    },
    {
      key: '2',
      title: '节点 2',
    },
  ];

  return <Tree data={treeData} />;
};
```

### 可选择

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
      children: [
        {
          key: '1-1',
          title: '节点 1-1',
        },
        {
          key: '1-2',
          title: '节点 1-2',
        },
      ],
    },
  ];

  return (
    <Tree
      data={treeData}
      selectable
      multiple
      defaultSelectedKeys={['1-1']}
      onSelect={(selectedKeys, info) => {
        console.log('已选择:', selectedKeys, info);
      }}
    />
  );
};
```

### 可勾选

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
      children: [
        {
          key: '1-1',
          title: '节点 1-1',
        },
        {
          key: '1-2',
          title: '节点 1-2',
        },
      ],
    },
  ];

  return (
    <Tree
      data={treeData}
      checkable
      defaultCheckedKeys={['1-1']}
      onCheck={(checkedKeys, info) => {
        console.log('已勾选:', checkedKeys, info);
      }}
    />
  );
};
```

### 懒加载

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
    },
  ];

  const loadData = async (node) => {
    // 模拟加载数据
    return new Promise((resolve) => {
      setTimeout(() => {
        node.children = [
          { key: `${node.key}-1`, title: '子节点 1' },
          { key: `${node.key}-2`, title: '子节点 2' },
        ];
        resolve();
      }, 1000);
    });
  };

  return <Tree data={treeData} loadData={loadData} />;
};
```

### 禁用复选框

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
      children: [
        {
          key: '1-1',
          title: '节点 1-1',
          disabled: true,
        },
        {
          key: '1-2',
          title: '节点 1-2',
        },
      ],
    },
  ];

  return <Tree data={treeData} checkable />;
};
```

### 默认展开和选中

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
      children: [
        {
          key: '1-1',
          title: '节点 1-1',
        },
      ],
    },
  ];

  return (
    <Tree
      data={treeData}
      defaultExpandedKeys={['1']}
      defaultSelectedKeys={['1-1']}
      defaultCheckedKeys={['1-1']}
    />
  );
};
```

### 节点过滤

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
      children: [
        {
          key: '1-1',
          title: '节点 1-1',
        },
      ],
    },
  ];

  return <Tree data={treeData} filterValue="节点 1" />;
};
```

### 手风琴模式

```tsx
import React from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

export default () => {
  const treeData = [
    {
      key: '1',
      title: '节点 1',
      children: [
        {
          key: '1-1',
          title: '节点 1-1',
        },
      ],
    },
    {
      key: '2',
      title: '节点 2',
      children: [
        {
          key: '2-1',
          title: '节点 2-1',
        },
      ],
    },
  ];

  return <Tree data={treeData} accordion />;
};
```

### 可拖拽节点

```tsx
import React, { useState } from 'react';
import { Tree } from 'IceCream-UI';
import './index.less';

const Demo = () => {
  const [data, setData] = useState([
    {
      key: '1',
      title: 'Level one 1',
      children: [
        {
          key: '1-1',
          title: 'Level two 1-1',
          children: [
            {
              key: '1-1-1',
              title: 'Level three 1-1-1',
            },
          ],
        },
      ],
    },
    {
      key: '2',
      title: 'Level one 2',
      children: [
        {
          key: '2-1',
          title: 'Level two 2-1',
          children: [
            {
              key: '2-1-1',
              title: 'Level three 2-1-1',
            },
          ],
        },
        {
          key: '2-2',
          title: 'Level two 2-2',
          children: [
            {
              key: '2-2-1',
              title: 'Level three 2-2-1',
            },
          ],
        },
      ],
    },
    {
      key: '3',
      title: 'Level one 3',
      children: [
        {
          key: '3-1',
          title: 'Level two 3-1',
          children: [
            {
              key: '3-1-1',
              title: 'Level three 3-1-1',
            },
          ],
        },
        {
          key: '3-2',
          title: 'Level two 3-2',
          children: [
            {
              key: '3-2-1',
              title: 'Level three 3-2-1',
            },
          ],
        },
      ],
    },
  ]);

  const handleDragStart = (node: TreeNode, e: React.DragEvent) => {
    console.log('drag start', node);
  };

  const handleDragEnter = (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => {
    console.log('tree drag enter:', dropNode.title);
  };

  const handleDragLeave = (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => {
    console.log('tree drag leave:', dropNode.title);
  };

  const handleDragOver = (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => {
    console.log('tree drag over:', dropNode.title);
  };

  const handleDragEnd = (
    dragNode: TreeNode,
    dropNode: TreeNode | null,
    dropType: 'before' | 'after' | 'inner',
    e: React.DragEvent,
  ) => {
    console.log('tree drag end:', dropNode?.title, dropType);
  };

  const handleDrop = (
    dragNode: TreeNode,
    dropNode: TreeNode,
    dropType: 'before' | 'after' | 'inner',
    e: React.DragEvent,
  ) => {
    console.log('tree drop:', dropNode.title, dropType);
  };

  const allowDrop = (
    dragNode: TreeNode,
    dropNode: TreeNode,
    dropType: 'before' | 'after' | 'inner',
  ) => {
    if (dropNode.title === 'Level two 3-1') {
      return dropType !== 'inner';
    }
    return true;
  };

  const allowDrag = (node: TreeNode) => {
    return !node.title?.toString().includes('Level three 3-1-1');
  };

  return (
    <Tree
      data={data}
      draggable
      defaultExpandAll
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      allowDrop={allowDrop}
      allowDrag={allowDrag}
    />
  );
};

export default Demo;
```

## API

### Tree

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树形数据 | `TreeNode[]` | - |
| defaultExpandedKeys | 默认展开的节点 | `string[]` | [] |
| defaultSelectedKeys | 默认选中的节点 | `string[]` | [] |
| defaultCheckedKeys | 默认勾选的节点 | `string[]` | [] |
| expandedKeys | 受控的展开节点 | `string[]` | - |
| selectedKeys | 受控的选中节点 | `string[]` | - |
| checkedKeys | 受控的勾选节点 | `string[]` | - |
| checkable | 是否显示复选框 | `boolean` | false |
| selectable | 是否可选中 | `boolean` | true |
| multiple | 是否允许多选 | `boolean` | false |
| accordion | 是否只允许同时展开一个节点 | `boolean` | false |
| draggable | 是否允许拖拽 | `boolean` | false |
| showLine | 是否显示连接线 | `boolean` | false |
| loadData | 异步加载数据 | `(node: TreeNode) => Promise<void>` | - |
| onExpand | 展开节点时的回调 | `(expandedKeys: string[], info: { node: TreeNode; expanded: boolean }) => void` | - |
| onSelect | 选中节点时的回调 | `(selectedKeys: string[], info: { node: TreeNode; selected: boolean }) => void` | - |
| onCheck | 勾选节点时的回调 | `(checkedKeys: string[], info: { node: TreeNode; checked: boolean }) => void` | - |
| onDragStart | 开始拖拽时的回调 | `(node: TreeNode) => void` | - |
| onDragEnd | 结束拖拽时的回调 | `(node: TreeNode) => void` | - |
| onDrop | 放置节点时的回调 | `(info: { dragNode: TreeNode; dropNode: TreeNode; dropPosition: number }) => void` | - |
| filterValue | 过滤值 | `string` | - |
| className | 额外的 CSS 类名 | `string` | - |
| style | 额外的样式 | `React.CSSProperties` | - |

### TreeNode

| 参数       | 说明           | 类型              | 默认值 |
| ---------- | -------------- | ----------------- | ------ |
| key        | 唯一标识       | `string`          | -      |
| title      | 节点标题       | `React.ReactNode` | -      |
| children   | 子节点         | `TreeNode[]`      | -      |
| isLeaf     | 是否为叶子节点 | `boolean`         | -      |
| disabled   | 是否禁用       | `boolean`         | false  |
| checkable  | 是否显示复选框 | `boolean`         | true   |
| selectable | 是否可选中     | `boolean`         | true   |
| expanded   | 是否展开       | `boolean`         | false  |
| selected   | 是否选中       | `boolean`         | false  |
| checked    | 是否勾选       | `boolean`         | false  |
| loading    | 是否加载中     | `boolean`         | false  |

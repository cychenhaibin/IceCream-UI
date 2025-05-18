# Progress 进度条

展示操作的当前进度。

## 何时使用

- 在操作需要较长时间才能完成时，显示操作的当前进度
- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时
- 当需要显示一个过程完成的百分比时
- 在文件上传、表单提交等场景下，展示上传/提交进度
- 在数据加载、处理等场景下，展示加载/处理进度

## line 型进度条

### 基本使用

line 型进度条最基本使用。

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Line_Base = () => {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Progress percent={30} />
    </div>
  );
};

export default Line_Base;
```

### 小型进度条

适合在狭窄地区使用

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Line_Sml = () => {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Progress percent={30} size="small" />
    </div>
  );
};

export default Line_Sml;
```

### 进度条状态

进度条可以设置不同状态

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Line_Status = () => {
  return (
    <div
      style={{
        width: '600px',
        margin: '0 auto',
        display: 'grid',
        gap: '16px',
      }}
    >
      <Progress percent={30} status="active" />
      <Progress percent={30} status="exception" />
      <Progress percent={30} status="success" />
    </div>
  );
};

export default Line_Status;
```

### 进度条边缘形状

圆形，方形可选。默认圆形。

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Circle_StrokeLinecap = () => {
  return (
    <div
      style={{
        width: '600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <Progress percent={30} type="circle" strokeLinecap="butt" />
      <Progress percent={50} type="circle" strokeLinecap="round" />
    </div>
  );
};

export default Circle_StrokeLinecap;
```

### 进度条步骤

steps 仅当`type==='line'`生效。

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Line_Step = () => {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <div>
        <Progress percent={30} steps={4} status="success" />
      </div>
      <div>
        <Progress percent={30} steps={6} />
      </div>
    </div>
  );
};

export default Line_Step;
```

## circle 型进度条

circle 型进度条在`rc-progress`库基础上封装。

### 基本使用

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Circle_Base = () => {
  return (
    <div
      style={{
        width: '600px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Progress percent={30} type="circle" />
    </div>
  );
};

export default Circle_Base;
```

### 进度条边缘形状

同`line`型，可设`round`和`butt`。

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Line_StrokeLinecap = () => {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Progress percent={30} strokeLinecap="butt" />
      <Progress percent={30} strokeLinecap="round" />
    </div>
  );
};

export default Line_StrokeLinecap;
```

### 进度条状态

进度条可以设置不同状态

```tsx
import { Progress } from 'IceCream-UI';
import React from 'react';
const Circle_Status = () => {
  return (
    <div
      style={{
        width: '600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 0.5fr)',
      }}
    >
      <Progress percent={30} type="circle" status="active" />
      <Progress percent={30} type="circle" status="exception" />
      <Progress percent={30} type="circle" status="success" />
    </div>
  );
};

export default Circle_Status;
```

## API 说明

### 通用

|    参数     |                    类型                    |      说明      |   默认值    |
| :---------: | :----------------------------------------: | :------------: | :---------: | ------ |
|    type     |                   `line`                   |    `circle`    | 进度条类型  | `line` |
|   percent   |                  `number`                  |   进度条数值   |      0      |
|   format    |    `(percent?:number)=>React.ReactNode`    | 格式化进度数字 | `undefined` |
|    size     |             `default`\|`small`             |  进度条的大小  |  `default`  |
| strokeWidth |                  `number`                  |  进度条的宽度  |      6      |
|  showInfo   |                 `boolean`                  | 是否显示进度值 |   `true`    |
|   status    | `normal`\|`exception`\|`active`\|`success` | 当前进度的状态 |  `normal`   |

### line 型组件

|     参数      |   类型   |       说明       |   默认值    |
| :-----------: | :------: | :--------------: | :---------: | -------------- | ------ |
| strokeLinecap |  `butt`  |     `square`     |   `round`   | 进度条边缘形状 | `butt` |
|  trailColor   | `string` |  进度条尾部颜色  | `undefined` |
|     steps     | `number` | 步骤进度条的步数 | `undefined` |

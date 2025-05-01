# Rate 评分

评分组件，支持多种自定义配置。

## 基础用法

最简单的用法。用户可以通过点击星星进行评分。

```jsx
import React, { useState } from 'react';
import { Rate } from 'IceCream-UI';

export default () => {
  const [value, setValue] = useState(0);
  
  return (
    <div>
      <Rate value={value} onChange={setValue} />
      <div style={{ marginTop: 8 }}>
        当前评分：{value} 分
      </div>
    </div>
  );
};
```

## 自定义颜色分级

评分默认被分为三个等级，不同分数段显示不同的颜色。

```jsx
import React, { useState } from 'react';
import { Rate } from 'IceCream-UI';

export default () => {
  const [value, setValue] = useState(0);
  
  return (
    <div>
      <Rate 
        value={value}
        onChange={setValue}
        colors={['#F56C6C', '#E6A23C', '#67C23A']}
        lowThreshold={2}
        highThreshold={4}
      />
      <div style={{ marginTop: 8 }}>
        {value <= 2 && <span style={{ color: '#F56C6C' }}>较差 ({value} 分)</span>}
        {value > 2 && value <= 4 && <span style={{ color: '#E6A23C' }}>一般 ({value} 分)</span>}
        {value > 4 && <span style={{ color: '#67C23A' }}>优秀 ({value} 分)</span>}
      </div>
    </div>
  );
};
```

## 辅助文字

用辅助文字直接表达对应分数的评价。

```jsx
import React, { useState } from 'react';
import { Rate } from 'IceCream-UI';

export default () => {
  const [value, setValue] = useState(0);
  const texts = ['极差', '失望', '一般', '满意', '惊喜'];
  
  return (
    <div>
      <Rate 
        value={value}
        onChange={setValue}
        showText 
        texts={texts}
      />
      <div style={{ marginTop: 8 }}>
        您的评价：{value ? texts[value - 1] : '未评分'}
      </div>
    </div>
  );
};
```

## 可清除

支持重置评分。

```jsx
import React, { useState } from 'react';
import { Rate } from 'IceCream-UI';

export default () => {
  const [value, setValue] = useState(0);
  
  return (
    <div>
      <Rate 
        value={value}
        onChange={setValue}
        allowClear
      />
      <div style={{ marginTop: 8 }}>
        当前评分：{value || '未评分'} {value ? '分' : ''}
        {value > 0 && <span style={{ marginLeft: 8, fontSize: 12, color: '#999' }}>(点击相同分数可清除)</span>}
      </div>
    </div>
  );
};
```

## 半星模式

支持更精确的评分。

```jsx
import React, { useState } from 'react';
import { Rate } from 'IceCream-UI';

export default () => {
  const [value, setValue] = useState(0);
  
  return (
    <div>
      <Rate 
        allowHalf 
        value={value} 
        onChange={setValue}
      />
      <div style={{ marginTop: 8 }}>
        当前评分：{value} 分
      </div>
    </div>
  );
};
```

## 不同图标

提供多种图标选择。

```jsx
import React, { useState } from 'react';
import { Rate } from 'IceCream-UI';

export default () => {
  const [values, setValues] = useState({
    star: 0,
    heart: 0,
    like: 0
  });
  
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Rate 
          icon="star" 
          value={values.star} 
          onChange={(val) => setValues(prev => ({ ...prev, star: val }))}
        />
        <span style={{ marginLeft: 8 }}>星星评分：{values.star} 分</span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Rate 
          icon="heart" 
          value={values.heart} 
          onChange={(val) => setValues(prev => ({ ...prev, heart: val }))}
        />
        <span style={{ marginLeft: 8 }}>心形评分：{values.heart} 分</span>
      </div>
    </div>
  );
};
```

## 综合示例

结合多个特性的综合示例。

```jsx
import React, { useState } from 'react';
import { Rate } from 'IceCream-UI';

export default () => {
  const [config, setConfig] = useState({
    value: 0,
    allowHalf: false,
    allowClear: true,
    disabled: false,
    icon: 'star'
  });
  
  const icons = ['star', 'heart', 'like'];
  const texts = ['极差', '失望', '一般', '满意', '惊喜'];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Rate 
          value={config.value}
          onChange={(val) => setConfig(prev => ({ ...prev, value: val }))}
          allowHalf={config.allowHalf}
          allowClear={config.allowClear}
          disabled={config.disabled}
          icon={config.icon}
          showText
          texts={texts}
        />
      </div>
      
      <div style={{ marginBottom: 16 }}>
        当前评分：{config.value} 分
        {config.value > 0 && <span>（{texts[Math.ceil(config.value) - 1]}）</span>}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ marginRight: 16 }}>
          <input
            type="checkbox"
            checked={config.allowHalf}
            onChange={(e) => setConfig(prev => ({ ...prev, allowHalf: e.target.checked }))}
          />
          允许半星
        </label>

        <label style={{ marginRight: 16 }}>
          <input
            type="checkbox"
            checked={config.allowClear}
            onChange={(e) => setConfig(prev => ({ ...prev, allowClear: e.target.checked }))}
          />
          可清除
        </label>

        <label>
          <input
            type="checkbox"
            checked={config.disabled}
            onChange={(e) => setConfig(prev => ({ ...prev, disabled: e.target.checked }))}
          />
          禁用
        </label>
      </div>

      <div>
        图标类型：
        <select
          value={config.icon}
          onChange={(e) => setConfig(prev => ({ ...prev, icon: e.target.value }))}
          style={{ marginLeft: 8 }}
        >
          {icons.map(icon => (
            <option key={icon} value={icon}>{icon}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | `number` | - |
| defaultValue | 默认值 | `number` | 0 |
| max | 最大分值 | `number` | 5 |
| allowHalf | 是否允许半选 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| texts | 辅助文字数组 | `string[]` | `[]` |
| showText | 是否显示辅助文字 | `boolean` | `false` |
| icon | 图标类型 | `'star' \| 'heart' \| 'like'` | `'star'` |
| colors | 三个等级对应的颜色数组 | `string[]` | `['#F7BA2A', '#F7BA2A', '#F7BA2A']` |
| lowThreshold | 低分和中等分数的界限值 | `number` | 2 |
| highThreshold | 高分和中等分数的界限值 | `number` | 4 |
| onChange | 评分改变时的回调 | `(value: number) => void` | - |

### 主题定制

组件提供了以下 CSS 变量，可用于自定义主题：

```css
:root {
  --ice-rate-font-size: 20px;
  --ice-rate-icon-color: #E8E8E8;
  --ice-rate-active-color: #F7BA2A;
  --ice-rate-text-color: #909399;
  --ice-rate-text-font-size: 14px;
}
```

## 注意事项

1. `value` 和 `defaultValue` 的取值范围是 0 到 `max`。
2. 当同时指定 `value` 和 `defaultValue` 时，`value` 的优先级更高。
3. `colors` 数组必须包含三个元素，分别对应低分、中等分和高分的颜色。
4. 使用 `allowHalf` 时，`value` 和 `defaultValue` 可以是小数，但只支持 .5 的倍数。

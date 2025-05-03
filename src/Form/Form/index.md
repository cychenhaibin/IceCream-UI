<!-- # Form 表单组件

一个灵活、易用的表单组件，支持多种输入项、校验、布局与动态表单项。

## 主要特性
- 支持 Input、Select、Radio、Checkbox 等常用输入项
- 支持 FormItem 作为输入项容器，便于获取和校验值
- 支持行内表单（inline）
- 支持标签对齐方式（labelPosition: left/top）
- 支持表单校验（必填、数字、最小/最大值等）
- 支持动态添加/删除表单项
- 支持尺寸控制（small、middle、large）

## API

### Form
| 属性           | 说明                       | 类型           | 默认值   |
|----------------|----------------------------|----------------|----------|
| initialValues  | 初始表单值                 | object         | {}       |
| rules          | 校验规则                   | object         | {}       |
| inline         | 是否为行内表单             | boolean        | false    |
| labelPosition  | 标签对齐方式（left/top）   | string         | left     |
| size           | 尺寸（small/middle/large） | string         | middle   |
| onFinish       | 提交回调                   | (values) => {} | -        |

### FormItem
| 属性           | 说明                       | 类型           | 默认值   |
|----------------|----------------------------|----------------|----------|
| label          | 标签文本                   | string         | -        |
| prop           | 字段名（用于取值/校验）    | string         | -        |
| rules          | 校验规则                   | array          | []       |
| labelPosition  | 标签对齐方式（left/top）   | string         | -        |
| size           | 尺寸（small/middle/large） | string         | -        |

### Input/Select/Radio/Checkbox
继承原生属性，支持 size。

## 校验规则
- required: 必填 { required: true, message: '请输入xxx' }
- type: 类型校验 { type: 'number', message: '请输入数字' }
- min/max: 数值范围 { min: 1, message: '最小为1' }

## 用法示例

### 基础表单
```tsx
import React from 'react';
import { Form, FormItem, Input, Select, Radio, Checkbox } from './index';
export default () => {
  return (
    <div>
      <Form
        initialValues={{ username: '', age: '', gender: 'male', agree: false }}
        rules={{
          username: [{ required: true, message: '请输入用户名' }],
          age: [{ type: 'number', message: '请输入数字' }, { min: 1, message: '最小为1' }],
          gender: [{ required: true, message: '请选择性别' }],
          agree: [{ required: true, message: '请同意协议' }],
        }}
        onFinish={values => console.log(values)}
      >
        <FormItem label="用户名" prop="username">
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input placeholder="请输入年龄" />
        </FormItem>
        <FormItem label="性别" prop="gender">
          <Radio name="gender" options={[{ label: '男', value: 'male' }, { label: '女', value: 'female' }]} />
        </FormItem>
        <FormItem label="同意协议" prop="agree">
          <Checkbox />
        </FormItem>
        <button type="submit">提交</button>
      </Form>
    <div/>
  )
}
```

### 行内表单
```tsx
import React from 'react';
<Form inline>
  <FormItem label="搜索" prop="search">
    <Input placeholder="请输入关键词" />
  </FormItem>
  <button type="submit">搜索</button>
</Form>
```

### 标签对齐
```tsx
<Form labelPosition="top">
  <FormItem label="邮箱" prop="email">
    <Input placeholder="请输入邮箱" />
  </FormItem>
</Form>
```

### 尺寸控制
```tsx
<Form size="large">
  <FormItem label="大号输入" prop="big">
    <Input />
  </FormItem>
  <FormItem label="小号输入" prop="small" size="small">
    <Input />
  </FormItem>
</Form>
```

### 动态添加/删除表单项
可通过父组件控制 FormItem 的渲染实现。

## 方法
通过 ref 可获取表单方法：validate、getValues、setFieldValue、reset、setErrors。

---
如需更多用法，请参考源码或联系开发者。 -->

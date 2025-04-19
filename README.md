# IceCream-UI

IceCream-UI 是一个基于 React 的轻量级 UI 组件库，提供了一系列美观、易用的组件，帮助开发者快速构建现代化的 Web 应用。

## ✨ 特性

- 🎨 精心设计的 UI 组件，提供良好的视觉体验
- 🚀 基于 React 18 开发，支持最新的 React 特性
- 📦 按需加载，减少打包体积
- 🎯 完善的 TypeScript 支持
- 📱 响应式设计，适配各种屏幕尺寸
- 🎭 支持主题定制
- 📖 详细的文档和示例

## 📦 安装

```bash
npm install icecream-ui
# 或
yarn add icecream-ui
```

## 🔨 使用

```tsx
import { Button, Message } from 'icecream-ui';
import 'icecream-ui/dist/index.css';

const App = () => {
  return (
    <div>
      <Button type="highlight" onClick={() => Message.success('Hello IceCream-UI!')}>
        点击我
      </Button>
    </div>
  );
};
```

## 🎨 组件

### 基础组件

- [Button 按钮](./src/Button/index.md) - 按钮组件，支持多种类型和状态
- [Message 消息提示](./src/Message/index.md) - 全局展示操作反馈信息

### 反馈组件

- [Message 消息提示](./src/Message/index.md) - 全局展示操作反馈信息

## 🛠 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建文档
npm run docs:build

# 构建组件
npm run build
```

## 📝 文档

详细的组件文档和示例请访问：[文档网站](https://your-docs-site.com)

## 🤝 贡献

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

[MIT](./LICENSE)

<!--
 * @Author: xuwei
 * @Date: 2025-09-11 00:14:34
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 15:43:31
 * @Description: Do not edit
-->
# Ant Design +

一个基于 Ant Design 的 React 组件库，提供更多实用的业务组件。

## 特性

-   🚀 基于 React 19 和 TypeScript
-   🎨 基于 Ant Design 设计语言
-   📦 开箱即用的高质量组件
-   🛠️ 完整的 TypeScript 支持
-   📖 详细的文档和示例
-   🌍 支持国际化

## 安装

```bash
npm install @ant-design-plus/components
# 或
yarn add @ant-design-plus/components
# 或
pnpm add @ant-design-plus/components
```

## 使用

```tsx
import { Button } from '@ant-design-plus/components'

function App() {
    return <Button type="primary">Hello World</Button>
}
```

## 开发

```bash
# 安装依赖
pnpm install

# 启动文档站点
pnpm dev

# 构建组件库
pnpm build

# 构建文档
pnpm build:docs

# 发布组件库
pnpm publish:components
```

## 项目结构

```
ant-design-plus/
├── packages/
│   ├── components/     # 组件库
│   └── docs/          # 文档站点
├── package.json
└── README.md
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

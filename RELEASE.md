# 发布指南

## 项目概述

这是一个基于 Vite 7、React 19 和 Ant Design 的组件库项目，包含：

1. **组件库** (`packages/components`) - 基于 Ant Design 的增强组件库
2. **文档站点** (`packages/docs`) - 组件演示和 API 文档

## 技术栈

- **构建工具**: Vite 7.1.5
- **前端框架**: React 19.1.1
- **UI 框架**: Ant Design 5.27.3
- **样式方案**: styled-components 6.1.19 (CSS-in-JS，样式文件分离)
- **路由**: React Router 7.8.2
- **包管理**: pnpm workspaces
- **类型检查**: TypeScript 5.7.3
- **代码质量**: ESLint 9.35.0

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发模式

```bash
# 启动文档站点开发服务器
pnpm dev

# 构建组件库
pnpm build

# 构建文档站点
pnpm build:docs

# 构建所有包
pnpm build:all
```

### 3. 代码质量检查

```bash
# ESLint 检查
pnpm lint

# 修复 ESLint 问题
pnpm lint:fix

# TypeScript 类型检查
pnpm type-check
```

## 发布到 NPM

### 1. 配置 NPM 账户

```bash
npm login
```

### 2. 使用 Changeset 管理版本

```bash
# 添加变更记录
pnpm changeset

# 更新版本号
pnpm version-packages

# 发布到 NPM
pnpm release
```

### 3. 手动发布（可选）

```bash
# 构建组件库
pnpm build

# 发布组件库
cd packages/components
npm publish --access public
```

## GitHub Pages 部署

### 1. 推送代码到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/ant-design-plus.git
git push -u origin main
```

### 2. 配置 GitHub 仓库

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 "GitHub Actions" 作为部署源
3. 添加 `NPM_TOKEN` 密钥到仓库 Secrets（用于自动发布）

### 3. 自动部署

- 推送到 `main` 分支会自动触发文档站点部署
- 创建 tag 会自动触发 NPM 发布

## 项目结构

```
ant-design-plus/
├── packages/
│   ├── components/          # 组件库
│   │   ├── src/
│   │   │   ├── components/  # 组件实现
│   │   │   ├── hooks/       # 自定义 Hooks
│   │   │   ├── utils/       # 工具函数
│   │   │   └── theme/       # 主题配置
│   │   └── dist/            # 构建输出
│   └── docs/                # 文档站点
│       ├── src/
│       │   ├── components/  # 文档组件
│       │   └── pages/       # 页面组件
│       └── dist/            # 构建输出
├── .github/workflows/       # GitHub Actions
├── .changeset/              # Changeset 配置
└── README.md
```

## 组件特性

### Button 组件

- 渐变背景效果
- 自定义圆角
- 悬停动画效果
- 波纹点击效果

### Card 组件

- 多种阴影级别
- 渐变边框
- 悬停提升效果
- 自定义圆角

### Table 组件

- 斑马纹样式
- 紧凑模式
- 悬停高亮
- 渐变表头

### Form 组件

- 继承 Ant Design Form 所有功能
- 自定义样式增强

## 主题系统

项目使用 styled-components 提供主题支持：

```tsx
import { ThemeProvider } from '@ant-design-plus/components'

// 自定义主题
const customTheme = {
    colors: {
        primary: '#1890ff',
        secondary: '#722ed1',
    },
    spacing: {
        md: '16px',
    },
}

;<ThemeProvider theme={customTheme}>
    <App />
</ThemeProvider>
```

## 注意事项

1. **依赖管理**: 所有公共依赖在根目录 `package.json` 中管理
2. **样式方案**: 使用 CSS-in-JS (styled-components)，但样式定义在单独的 `styles.ts` 文件中
3. **类型安全**: 全面的 TypeScript 支持
4. **代码规范**: 使用 ESLint 9.35.0 和严格的 TypeScript 配置

## 故障排除

### 构建错误

- 确保使用 Node.js 18+ 和 pnpm 8+
- 清理依赖：`pnpm clean && pnpm install`

### 类型错误

- 运行类型检查：`pnpm type-check`
- 更新类型定义：`pnpm add -D @types/react@latest @types/react-dom@latest`

### 样式问题

- 确保 styled-components 版本兼容
- 检查主题配置是否正确

## 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/new-component`
3. 提交更改：`git commit -m 'Add new component'`
4. 推送分支：`git push origin feature/new-component`
5. 创建 Pull Request

## 许可证

MIT License

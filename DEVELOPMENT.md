# 开发指南

## 项目结构

```
ant-design-plus/
├── packages/
│   ├── components/          # 组件库
│   │   ├── src/
│   │   │   ├── components/  # 组件源码
│   │   │   ├── hooks/       # 自定义 Hooks
│   │   │   ├── utils/       # 工具函数
│   │   │   └── index.ts     # 入口文件
│   │   ├── dist/            # 构建输出
│   │   └── package.json
│   └── docs/                # 文档站点
│       ├── src/
│       │   ├── components/  # 文档组件
│       │   ├── pages/       # 页面组件
│       │   └── App.tsx      # 应用入口
│       ├── dist/            # 构建输出
│       └── package.json
├── .github/workflows/       # GitHub Actions
├── scripts/                 # 脚本文件
└── package.json            # 根配置
```

## 开发环境设置

### 1. 安装依赖

```bash
# 安装 pnpm（如果还没有安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 2. 启动开发服务器

```bash
# 启动文档开发服务器
cd packages/docs
pnpm dev

# 或者在根目录运行
pnpm dev:docs
```

### 3. 构建项目

```bash
# 构建组件库
cd packages/components
pnpm build

# 构建文档
cd packages/docs
pnpm build

# 或者在根目录构建所有包
pnpm build
```

## 组件开发

### 1. 创建新组件

在 `packages/components/src/components/` 目录下创建新的组件文件夹：

```
NewComponent/
├── index.tsx        # 组件主文件
├── styles.ts        # 样式文件（CSS-in-JS）
└── README.md        # 组件说明
```

### 2. 组件模板

```tsx
// index.tsx
import React from 'react'
import { ComponentProps as AntdComponentProps } from 'antd'
import classNames from 'classnames'
import { StyledComponent } from './styles'

export interface ComponentProps extends AntdComponentProps {
    // 自定义属性
    customProp?: boolean
    prefixCls?: string
    className?: string
}

const Component: React.FC<ComponentProps> = ({
    customProp = false,
    prefixCls = 'adp-component',
    className,
    children,
    ...props
}) => {
    const componentClass = classNames(
        prefixCls,
        {
            [`${prefixCls}-custom`]: customProp,
        },
        className
    )

    return (
        <StyledComponent
            className={componentClass}
            $customProp={customProp}
            $prefixCls="ant"
            {...props}
        >
            {children}
        </StyledComponent>
    )
}

export default Component
```

```tsx
// styles.ts
import styled, { css } from 'styled-components'
import { Component as AntdComponent } from 'antd'

interface StyledComponentProps {
    $customProp?: boolean
    $prefixCls?: string
}

export const StyledComponent: any = styled(AntdComponent)<StyledComponentProps>`
    // 基础样式
    &.${(props) => props.$prefixCls || 'ant'}-component {
        // 样式定义
    }

    // 条件样式
    ${(props) =>
        props.$customProp &&
        css`
            // 自定义样式
        `}
`
```

### 3. 导出组件

在 `packages/components/src/index.ts` 中导出新组件：

```tsx
export { default as NewComponent } from './components/NewComponent'
export type { ComponentProps as NewComponentProps } from './components/NewComponent'
```

## 文档开发

### 1. 创建组件演示页面

在 `packages/docs/src/pages/components/` 目录下创建演示页面：

```tsx
// NewComponentDemo/index.tsx
import React from 'react'
import { Typography, Space } from 'antd'
import { NewComponent } from '@ant-design-plus/components'
import DemoContainer from '../../../components/DemoContainer'

const { Title, Paragraph } = Typography

const NewComponentDemo: React.FC = () => {
    return (
        <div>
            <Title level={1}>NewComponent 新组件</Title>
            <Paragraph>组件描述...</Paragraph>

            <DemoContainer
                title="基础用法"
                description="组件的基本使用方法。"
            >
                <NewComponent>示例内容</NewComponent>
            </DemoContainer>

            {/* 更多演示... */}
        </div>
    )
}

export default NewComponentDemo
```

### 2. 添加路由

在 `packages/docs/src/App.tsx` 中添加路由：

```tsx
import NewComponentDemo from './pages/components/NewComponentDemo'

// 在路由配置中添加
;<Route
    path="/components/new-component"
    element={<NewComponentDemo />}
/>
```

## 发布流程

### 1. 版本管理

使用 Changeset 管理版本：

```bash
# 创建变更记录
pnpm changeset

# 升级版本
pnpm changeset version

# 发布
pnpm changeset publish
```

### 2. 自动发布

推送标签到 GitHub 会自动触发发布流程：

```bash
git tag v1.0.1
git push origin v1.0.1
```

### 3. 手动发布

使用发布脚本：

```bash
chmod +x scripts/publish.sh
./scripts/publish.sh
```

## 代码规范

### 1. TypeScript

-   所有组件必须有完整的类型定义
-   使用严格的 TypeScript 配置
-   导出所有必要的类型

### 2. 样式

-   使用 styled-components 进行样式管理
-   支持动态前缀（通过 $prefixCls 属性）
-   保持与 Ant Design 的样式一致性

### 3. 命名规范

-   组件名使用 PascalCase
-   属性名使用 camelCase
-   CSS 类名使用 kebab-case
-   文件名使用 PascalCase（组件）或 camelCase（工具）

### 4. 提交规范

使用 Conventional Commits 规范：

```
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 样式更新
refactor: 重构
test: 测试
chore: 构建/工具链更新
```

## 测试

### 1. 单元测试

```bash
# 运行测试
pnpm test

# 测试覆盖率
pnpm test:coverage
```

### 2. 端到端测试

```bash
# 运行 E2E 测试
pnpm test:e2e
```

## 部署

### 1. GitHub Pages

文档会自动部署到 GitHub Pages：

-   推送到 main 分支会触发自动部署
-   访问地址：`https://<username>.github.io/ant-design-plus/`

### 2. NPM 包

组件库会发布到 NPM：

-   包名：`@ant-design-plus/components`
-   安装：`npm install @ant-design-plus/components`

## 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -m 'feat: add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建 Pull Request

## 常见问题

### Q: 如何添加新的依赖？

A: 在对应的 package.json 中添加依赖，然后运行 `pnpm install`。

### Q: 如何调试组件？

A: 在文档项目中创建演示页面，使用开发服务器进行调试。

### Q: 如何处理样式冲突？

A: 使用 styled-components 的作用域样式，避免全局样式污染。

### Q: 如何支持主题定制？

A: 通过 Ant Design 的 ConfigProvider 和 styled-components 的 ThemeProvider 实现。

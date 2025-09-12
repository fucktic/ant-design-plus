# 贡献指南

感谢您对 Ant Design Plus 的关注！我们欢迎任何形式的贡献。

## 开发环境

确保您的开发环境满足以下要求：

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 开始开发

1. Fork 并克隆仓库：

```bash
git clone <your-forked-repo-url>
cd ant-design-plus
```

2. 安装依赖：

```bash
pnpm install
```

3. 启动开发服务器：

```bash
pnpm dev
```

4. 构建组件库：

```bash
pnpm build
```

## 项目结构

```
ant-design-plus/
├── packages/
│   ├── components/     # 组件库源码
│   │   ├── src/
│   │   │   ├── components/  # 组件
│   │   │   ├── hooks/       # 自定义 Hooks
│   │   │   └── utils/       # 工具函数
│   │   └── package.json
│   └── docs/          # 文档站点
│       ├── src/
│       │   ├── components/  # 文档组件
│       │   └── pages/       # 文档页面
│       └── package.json
├── .github/workflows/ # GitHub Actions
├── package.json       # 根配置
└── README.md
```

## 开发规范

### 代码风格

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

### 组件开发

1. 在 `packages/components/src/components/` 下创建新组件目录
2. 组件必须包含：
    - `index.tsx` - 组件实现
    - `style.css` - 组件样式
3. 在 `packages/components/src/index.ts` 中导出组件
4. 在 `packages/docs/src/pages/components/` 下创建文档页面

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 发布流程

1. 创建 changeset：

```bash
pnpm changeset
```

2. 版本更新：

```bash
pnpm version-packages
```

3. 发布到 npm：

```bash
pnpm release
```

## 问题反馈

如果您发现了 bug 或有功能建议，请在 GitHub Issues 中提交。

## 许可证

MIT

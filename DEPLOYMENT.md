# 部署指南

本文档介绍如何部署 Ant Design Plus 组件库和文档站点。

## 组件库发布到 NPM

### 前置条件

1. 拥有 NPM 账号
2. 在 GitHub 仓库设置中添加 `NPM_TOKEN` secret

### 自动发布

当推送带有版本标签的提交时，GitHub Actions 会自动发布到 NPM：

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 手动发布

1. 构建组件库：

```bash
pnpm build
```

2. 发布到 NPM：

```bash
cd packages/components
npm publish
```

## 文档站点部署到 GitHub Pages

### 自动部署

当推送到 `main` 分支时，GitHub Actions 会自动构建并部署文档站点到 GitHub Pages。

### 手动部署

1. 构建文档站点：

```bash
pnpm build:docs
```

2. 部署到 GitHub Pages：

```bash
# 使用 gh-pages 工具
npx gh-pages -d packages/docs/dist
```

### GitHub Pages 设置

1. 进入仓库的 Settings > Pages
2. Source 选择 "GitHub Actions"
3. 确保 Actions 有写入权限

## 环境变量

### GitHub Actions

需要在仓库设置中配置以下 secrets：

-   `NPM_TOKEN`: NPM 发布令牌
-   `GITHUB_TOKEN`: GitHub 令牌（自动提供）

### 本地开发

创建 `.env.local` 文件（不要提交到版本控制）：

```env
# 如果需要的话，添加本地环境变量
```

## 域名配置

如果使用自定义域名，在 `packages/docs/public/` 目录下创建 `CNAME` 文件：

```
your-domain.com
```

## 构建优化

### 组件库

-   使用 Vite 进行构建
-   支持 Tree Shaking
-   生成 TypeScript 声明文件

### 文档站点

-   使用 Vite 进行构建
-   代码分割和懒加载
-   静态资源优化

## 监控和分析

建议添加以下工具：

1. **Bundle Analyzer**: 分析包大小
2. **Lighthouse**: 性能监控
3. **Sentry**: 错误监控

## 故障排除

### 常见问题

1. **构建失败**: 检查 Node.js 版本和依赖
2. **部署失败**: 检查 GitHub Actions 权限
3. **NPM 发布失败**: 检查 NPM_TOKEN 和包名

### 调试步骤

1. 查看 GitHub Actions 日志
2. 本地重现构建过程
3. 检查依赖版本兼容性

## 回滚策略

### NPM 包回滚

```bash
npm unpublish @ant-design-plus/components@version
```

### GitHub Pages 回滚

1. 回滚到之前的提交
2. 重新触发部署

## 安全考虑

1. 定期更新依赖
2. 使用 npm audit 检查漏洞
3. 限制 NPM 发布权限
4. 保护敏感的环境变量

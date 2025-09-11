# GitHub Pages 部署指南

## 🚀 部署状态

✅ **代码已推送**: 最新代码已推送到 GitHub  
🔄 **自动部署**: GitHub Actions 正在自动构建和部署  
📖 **文档地址**: [https://fucktic.github.io/ant-design-plus/](https://fucktic.github.io/ant-design-plus/)

## 📋 部署流程

### 1. 自动部署 (推荐)

当推送代码到 `main` 分支时，GitHub Actions 会自动：

-   安装依赖
-   构建组件库
-   构建文档站点
-   部署到 GitHub Pages

### 2. 手动部署

```bash
# 构建文档
pnpm build:docs

# 使用 gh-pages 工具部署
npx gh-pages -d packages/docs/dist
```

## ⚙️ GitHub Pages 设置

### 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 滚动到 **Pages** 部分
4. 在 **Source** 下选择 **GitHub Actions**
5. 保存设置

### 检查部署状态

1. 进入 **Actions** 标签查看工作流运行状态
2. 点击最新的 "Deploy to GitHub Pages" 工作流
3. 查看构建和部署日志

## 🔧 故障排除

### 常见问题

#### 1. 部署失败

-   检查 GitHub Actions 日志
-   确保 `packages/docs/dist` 目录存在
-   验证构建命令是否成功

#### 2. 页面显示 404

-   确认 GitHub Pages 已启用
-   检查仓库是否为公开仓库
-   等待几分钟让部署生效

#### 3. 资源加载失败

-   检查 `vite.config.ts` 中的 `base` 配置
-   确保路径配置正确：`base: '/ant-design-plus/'`

### 调试步骤

1. **本地测试**

    ```bash
    pnpm build:docs
    cd packages/docs/dist
    python -m http.server 8000
    ```

2. **检查构建输出**

    ```bash
    ls -la packages/docs/dist/
    ```

3. **验证 HTML 文件**
    ```bash
    cat packages/docs/dist/index.html
    ```

## 📝 配置文件

### GitHub Actions 工作流

文件位置: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    build-and-deploy:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v4

            - name: Setup Node.js
              uses: actions/setup-node@v4
              with:
                  node-version: '18'

            - name: Setup pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 8

            - name: Install dependencies
              run: pnpm install

            - name: Build components
              run: pnpm build

            - name: Build docs
              run: pnpm build:docs

            - name: Deploy to GitHub Pages
              if: github.ref == 'refs/heads/main'
              uses: peaceiris/actions-gh-pages@v3
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./packages/docs/dist
```

### Vite 配置

文件位置: `packages/docs/vite.config.ts`

确保包含正确的 base 路径：

```typescript
export default defineConfig({
    base: '/ant-design-plus/',
    // ... 其他配置
})
```

## 🎯 验证部署

### 检查清单

-   [ ] GitHub Actions 工作流运行成功
-   [ ] GitHub Pages 设置已启用
-   [ ] 文档网站可以正常访问
-   [ ] 所有页面和组件演示正常工作
-   [ ] 样式和资源正确加载

### 访问链接

-   **主页**: https://fucktic.github.io/ant-design-plus/
-   **组件演示**: https://fucktic.github.io/ant-design-plus/#/components/button
-   **GitHub 仓库**: https://github.com/fucktic/ant-design-plus

## 📞 支持

如果遇到部署问题：

1. 检查 GitHub Actions 日志
2. 查看本文档的故障排除部分
3. 确认所有配置文件正确
4. 等待几分钟让更改生效

---

**最后更新**: 2025 年 9 月 11 日  
**部署状态**: ✅ 已部署

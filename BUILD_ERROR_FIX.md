# 🔧 构建错误修复指南

## ❗ 问题诊断

您遇到的错误：

```
build-and-deploy
Process completed with exit code 1.
```

这表示 GitHub Actions 构建过程失败了。让我们逐步排查和修复。

## 🔍 常见构建失败原因

### 1. ESLint 配置问题

**错误特征**：`Cannot find package 'eslint-plugin-import'`

**解决方案**：

```bash
# 安装缺失的 ESLint 插件
pnpm add -D eslint-plugin-import @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 2. TypeScript 类型错误

**错误特征**：Type checking failed

**解决方案**：

```bash
# 检查 TypeScript 错误
pnpm run type-check
# 或者
npx tsc --noEmit
```

### 3. 依赖安装失败

**错误特征**：`pnpm install` 失败

**解决方案**：

```bash
# 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 4. 构建脚本错误

**错误特征**：`pnpm build` 或 `pnpm build:docs` 失败

## 🚀 立即修复步骤

### 第一步：本地诊断

```bash
# 1. 清理环境
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml

# 2. 重新安装依赖
pnpm install

# 3. 测试构建
pnpm build

# 4. 测试文档构建
pnpm build:docs
```

### 第二步：修复 ESLint 配置

如果遇到 ESLint 错误，临时禁用 pre-push 检查：

```bash
# 修改 .husky/pre-push 文件，注释掉 lint 检查
# 或者安装缺失的依赖
pnpm add -D eslint-plugin-import
```

### 第三步：简化 GitHub Actions 工作流

让我们创建一个更简单的工作流来避免复杂的依赖问题：

```yaml
name: Deploy to GitHub Pages

on:
    push:
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
              run: pnpm install --frozen-lockfile

            - name: Build components (skip lint)
              run: pnpm --filter @ant-design-plus/ui build

            - name: Build docs (skip lint)
              run: pnpm --filter @ant-design-plus/docs build

            - name: Deploy to GitHub Pages
              uses: peaceiris/actions-gh-pages@v3
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./packages/docs/dist
```

## 🛠️ 具体修复方案

### 方案 1：修复 ESLint 依赖

```bash
# 安装缺失的 ESLint 插件
pnpm add -D eslint-plugin-import @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks
```

### 方案 2：临时跳过 Lint 检查

修改 `package.json` 中的脚本：

```json
{
    "scripts": {
        "build": "pnpm --filter @ant-design-plus/ui build",
        "build:docs": "pnpm --filter @ant-design-plus/docs build",
        "build:no-lint": "pnpm build && pnpm build:docs"
    }
}
```

### 方案 3：更新工作流配置

创建新的 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
    push:
        branches: [main]

permissions:
    contents: read
    pages: write
    id-token: write

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
                  cache: 'npm'

            - name: Setup pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 8

            - name: Install dependencies
              run: pnpm install --no-frozen-lockfile

            - name: Build components
              run: |
                  cd packages/components
                  pnpm build

            - name: Build docs
              run: |
                  cd packages/docs  
                  pnpm build

            - name: Upload Pages artifact
              uses: actions/upload-pages-artifact@v2
              with:
                  path: ./packages/docs/dist

            - name: Deploy to GitHub Pages
              uses: actions/deploy-pages@v2
```

## 🔄 重新部署步骤

### 1. 应用修复

```bash
# 选择上述方案之一进行修复
# 例如：安装 ESLint 依赖
pnpm add -D eslint-plugin-import

# 提交修复
git add .
git commit -m "fix: 修复构建错误 - 添加缺失的 ESLint 依赖"
```

### 2. 推送并重新部署

```bash
git push origin main
```

### 3. 监控部署状态

1. 访问 GitHub Actions 页面
2. 查看最新的工作流运行
3. 检查每个步骤的日志

## 📊 调试清单

-   [ ] 本地 `pnpm install` 成功
-   [ ] 本地 `pnpm build` 成功
-   [ ] 本地 `pnpm build:docs` 成功
-   [ ] ESLint 依赖已安装
-   [ ] TypeScript 编译无错误
-   [ ] GitHub Actions 权限已启用
-   [ ] 工作流文件语法正确

## 🆘 如果仍然失败

### 查看详细错误日志

1. 进入 GitHub Actions
2. 点击失败的工作流
3. 展开失败的步骤
4. 复制完整的错误信息

### 常见错误模式

-   **权限错误**：检查 GitHub Pages 设置
-   **依赖错误**：检查 package.json 和 pnpm-lock.yaml
-   **构建错误**：检查 TypeScript 和 ESLint 配置
-   **部署错误**：检查输出目录路径

---

**下一步**：选择一个修复方案，应用修复，然后重新推送代码！

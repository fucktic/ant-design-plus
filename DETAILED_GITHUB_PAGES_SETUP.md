# GitHub Pages 详细部署指南

## 🎯 完整部署步骤

### 第一步：确认仓库状态

#### 1.1 检查代码推送状态

```bash
# 确认本地代码已推送
git status
git log --oneline -3
```

#### 1.2 验证仓库可见性

1. 访问 GitHub 仓库：`https://github.com/fucktic/ant-design-plus`
2. 确认仓库是 **Public**（公开）状态
3. 如果是 Private，需要升级到 GitHub Pro 才能使用 GitHub Pages

### 第二步：启用 GitHub Pages（详细步骤）

#### 2.1 进入仓库设置页面

1. **打开仓库主页**

    - 在浏览器中访问：`https://github.com/fucktic/ant-design-plus`
    - 确保您已登录 GitHub 账户

2. **点击 Settings 标签**
    - 在仓库页面顶部，找到标签栏
    - 点击 **Settings**（齿轮图标）
    - 如果看不到此标签，说明您没有管理员权限

#### 2.2 配置 GitHub Pages

1. **找到 Pages 设置**

    - 在左侧边栏中，向下滚动
    - 找到并点击 **Pages** 选项
    - 进入 GitHub Pages 配置页面

2. **选择部署源**

    - 在 **Source** 部分，点击下拉菜单
    - 选择 **GitHub Actions**
    - **不要选择** "Deploy from a branch"

3. **保存设置**
    - 点击页面底部的 **Save** 按钮
    - 页面会显示绿色提示："Your site is ready to be published at..."

#### 2.3 确认设置成功

-   页面顶部会显示网站地址：`https://fucktic.github.io/ant-design-plus/`
-   状态显示为："Your GitHub Pages site is currently being built from GitHub Actions"

### 第三步：监控自动部署过程

#### 3.1 查看 GitHub Actions

1. **进入 Actions 页面**

    - 回到仓库主页
    - 点击顶部的 **Actions** 标签
    - 您会看到工作流运行历史

2. **识别部署工作流**
    - 找到名为 "Deploy to GitHub Pages" 的工作流
    - 最新的运行会显示在列表顶部
    - 状态图标含义：
        - 🟡 **黄色圆圈**：正在运行中
        - ✅ **绿色对勾**：运行成功
        - ❌ **红色叉号**：运行失败

#### 3.2 查看详细执行日志

1. **点击工作流运行**

    - 点击最新的 "Deploy to GitHub Pages" 运行
    - 进入工作流详情页面

2. **查看作业详情**

    - 点击 **build-and-deploy** 作业
    - 查看每个步骤的执行状态

3. **监控关键步骤**
    ```
    ✅ Checkout                    # 检出代码
    ✅ Setup Node.js              # 设置 Node.js 环境
    ✅ Setup pnpm                 # 设置 pnpm 包管理器
    ✅ Install dependencies       # 安装项目依赖
    ✅ Build components          # 构建组件库
    ✅ Build docs                # 构建文档站点
    ✅ Deploy to GitHub Pages    # 部署到 GitHub Pages
    ```

#### 3.3 处理常见错误

如果某个步骤失败，点击展开查看错误信息：

**常见错误及解决方案：**

-   **依赖安装失败**：检查 package.json 和 pnpm-lock.yaml
-   **构建失败**：检查 TypeScript 类型错误或语法错误
-   **部署失败**：检查 GitHub Pages 权限设置

### 第四步：验证部署结果

#### 4.1 等待部署完成

-   **首次部署**：通常需要 5-10 分钟
-   **后续部署**：通常需要 2-5 分钟
-   **部署完成标志**：所有步骤显示绿色对勾

#### 4.2 访问部署的网站

1. **打开网站**

    - 访问：`https://fucktic.github.io/ant-design-plus/`
    - 如果显示 404，等待 2-3 分钟后重试

2. **清除浏览器缓存**
    - 按 `Ctrl+F5`（Windows）或 `Cmd+Shift+R`（Mac）
    - 或者使用无痕浏览模式

#### 4.3 全面功能测试

1. **主页测试**

    - 确认页面正常加载
    - 检查样式是否正确显示
    - 验证导航菜单功能

2. **组件演示测试**

    - 点击 "组件" 菜单
    - 测试 Button 组件演示
    - 测试 Card 组件演示
    - 测试 Table 组件演示
    - 测试 Form 组件演示

3. **代码高亮测试**

    - 检查代码示例是否正确高亮
    - 测试代码复制功能
    - 验证代码展开/收起功能

4. **响应式测试**
    - 在桌面浏览器中测试
    - 在移动设备上测试
    - 调整浏览器窗口大小测试

### 第五步：设置自动更新

#### 5.1 理解自动部署机制

-   每次推送到 `main` 分支都会触发自动部署
-   无需手动操作，完全自动化
-   部署过程大约需要 3-5 分钟

#### 5.2 测试自动更新

1. **修改文档内容**

    ```bash
    # 编辑 README.md 或其他文件
    git add .
    git commit -m "test: 测试自动部署"
    git push origin main
    ```

2. **观察自动部署**
    - 推送后立即查看 GitHub Actions
    - 新的工作流运行会自动开始
    - 等待部署完成后访问网站验证更新

### 第六步：自定义域名设置（可选）

#### 6.1 准备自定义域名

如果您有自己的域名（如 `docs.yourdomain.com`）：

1. **添加 CNAME 文件**

    ```bash
    # 在 packages/docs/public/ 目录下创建 CNAME 文件
    echo "docs.yourdomain.com" > packages/docs/public/CNAME
    git add packages/docs/public/CNAME
    git commit -m "feat: 添加自定义域名"
    git push origin main
    ```

2. **配置 DNS 记录**
    - 在域名提供商处添加 CNAME 记录
    - 记录值：`fucktic.github.io`
    - 等待 DNS 传播（通常 24 小时内）

#### 6.2 在 GitHub 中配置自定义域名

1. 回到 GitHub Pages 设置页面
2. 在 **Custom domain** 部分输入您的域名
3. 勾选 **Enforce HTTPS**
4. 保存设置

## 🚨 故障排除指南

### 问题 1：GitHub Pages 设置中没有看到 "GitHub Actions" 选项

**可能原因：**

-   仓库是私有的
-   没有管理员权限
-   GitHub Actions 被禁用

**解决方案：**

1. 确保仓库是公开的
2. 检查您的权限级别
3. 在 Settings > Actions > General 中启用 Actions

### 问题 2：部署成功但网站显示 404

**可能原因：**

-   DNS 传播延迟
-   浏览器缓存
-   路径配置错误

**解决方案：**

1. 等待 5-10 分钟后重试
2. 清除浏览器缓存
3. 检查 `vite.config.ts` 中的 `base` 配置

### 问题 3：样式或资源加载失败

**可能原因：**

-   路径配置错误
-   构建配置问题

**解决方案：**

1. 检查 `vite.config.ts` 中的 `base: '/ant-design-plus/'`
2. 确认构建输出目录正确
3. 检查 HTML 中的资源路径

### 问题 4：GitHub Actions 构建失败

**常见错误及解决方案：**

1. **Node.js 版本问题**

    ```yaml
    # 在 .github/workflows/deploy.yml 中确认版本
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
          node-version: '18' # 确保版本正确
    ```

2. **依赖安装失败**

    ```bash
    # 本地测试依赖安装
    rm -rf node_modules pnpm-lock.yaml
    pnpm install
    ```

3. **构建命令失败**
    ```bash
    # 本地测试构建命令
    pnpm build
    pnpm build:docs
    ```

## 📞 获取帮助

如果遇到问题：

1. **检查 GitHub Actions 日志**

    - 详细的错误信息通常在日志中
    - 复制错误信息进行搜索

2. **本地重现问题**

    ```bash
    # 本地测试完整流程
    pnpm install
    pnpm build
    pnpm build:docs
    cd packages/docs/dist
    python -m http.server 8000
    ```

3. **验证配置文件**
    - 检查 `.github/workflows/deploy.yml`
    - 检查 `packages/docs/vite.config.ts`
    - 检查 `package.json` 中的脚本

---

**部署完成后，您的文档网站将在以下地址可用：**
🌐 **https://fucktic.github.io/ant-design-plus/**

**预计完成时间：** 5-10 分钟（首次部署）

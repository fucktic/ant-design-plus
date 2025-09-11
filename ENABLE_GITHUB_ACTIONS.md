# 🔧 启用 GitHub Actions 指南

## ❗ 问题说明

您遇到的错误信息：

```
Actions is currently unavailable for your repository, and your Pages site requires a Jekyll build step. To continue building your site on pushes, you need to enable Actions
```

这表示 GitHub Actions 在您的仓库中被禁用了，需要手动启用。

## 🚀 解决步骤

### 第一步：启用 GitHub Actions

#### 1.1 进入仓库设置

1. 访问您的仓库：`https://github.com/fucktic/ant-design-plus`
2. 点击顶部的 **Settings** 标签

#### 1.2 找到 Actions 设置

1. 在左侧边栏中，找到 **Actions** 部分
2. 点击 **General**

#### 1.3 启用 Actions 权限

在 **Actions permissions** 部分，选择以下选项之一：

-   **Allow all actions and reusable workflows** （推荐）
-   **Allow [organization] actions and reusable workflows**

#### 1.4 保存设置

1. 滚动到页面底部
2. 点击 **Save** 按钮

### 第二步：重新配置 GitHub Pages

#### 2.1 进入 Pages 设置

1. 在左侧边栏中，找到 **Pages** 选项
2. 点击进入 Pages 设置页面

#### 2.2 重新选择部署源

1. 在 **Source** 部分，确保选择 **GitHub Actions**
2. 如果显示其他选项，重新选择 **GitHub Actions**
3. 点击 **Save** 保存

### 第三步：触发部署

#### 3.1 推送代码触发部署

```bash
# 创建一个小的更改来触发部署
git commit --allow-empty -m "trigger: 启用 Actions 后重新部署"
git push origin main
```

#### 3.2 手动触发工作流（可选）

1. 进入 **Actions** 标签
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 **Run workflow** 按钮
4. 选择 `main` 分支
5. 点击 **Run workflow**

## 🔍 验证 Actions 是否启用

### 检查 Actions 标签

1. 回到仓库主页
2. 点击 **Actions** 标签
3. 如果能看到工作流列表，说明 Actions 已启用
4. 如果看到禁用消息，重复上述步骤

### 检查工作流运行

1. 推送代码后，应该能看到新的工作流运行
2. 工作流状态应该是：
    - 🟡 **运行中**：正在执行
    - ✅ **成功**：部署完成
    - ❌ **失败**：需要检查日志

## 🚨 常见问题

### 问题 1：仍然看不到 Actions 标签

**可能原因：**

-   仓库是 Fork 的，需要在 Fork 中启用
-   组织级别禁用了 Actions

**解决方案：**

1. 检查是否是 Fork 仓库
2. 如果是组织仓库，联系组织管理员
3. 确保您有仓库的管理员权限

### 问题 2：Actions 启用后工作流不运行

**解决方案：**

1. 检查 `.github/workflows/deploy.yml` 文件是否存在
2. 确认工作流语法正确
3. 手动触发一次工作流

### 问题 3：工作流运行失败

**解决方案：**

1. 点击失败的工作流查看详细日志
2. 检查错误信息
3. 常见错误：
    - 权限问题：检查 `GITHUB_TOKEN` 权限
    - 构建失败：检查代码语法错误
    - 依赖问题：检查 `package.json`

## 📋 完整检查清单

启用 Actions 后，请按以下清单验证：

-   [ ] ✅ GitHub Actions 已在仓库设置中启用
-   [ ] ✅ Actions 标签可以正常访问
-   [ ] ✅ GitHub Pages 源设置为 "GitHub Actions"
-   [ ] ✅ 推送代码后能看到工作流运行
-   [ ] ✅ 工作流运行成功（绿色对勾）
-   [ ] ✅ 网站可以正常访问：`https://fucktic.github.io/ant-design-plus/`

## 🎯 下一步

启用 Actions 后：

1. **等待部署完成**：通常需要 3-5 分钟
2. **访问网站**：`https://fucktic.github.io/ant-design-plus/`
3. **测试功能**：确保所有页面正常工作
4. **设置完成**：享受自动部署的便利！

---

**需要帮助？** 如果仍有问题，请检查：

-   GitHub Actions 日志
-   仓库权限设置
-   工作流文件语法

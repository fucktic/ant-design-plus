# 📚 部署文档说明

## 🎯 快速开始

您的 Ant Design Plus 项目已经配置好自动部署！

### 📖 文档地址

**在线文档**: [https://fucktic.github.io/ant-design-plus/](https://fucktic.github.io/ant-design-plus/)

### 📋 部署文档

我们为您准备了两个详细的部署指南：

1. **📄 GITHUB_PAGES_DEPLOYMENT.md** - 基础部署指南

    - 快速部署流程
    - 基本配置说明
    - 常见问题解决

2. **📄 DETAILED_GITHUB_PAGES_SETUP.md** - 详细部署指南 ⭐
    - 逐步详细操作说明
    - 完整的故障排除指南
    - 自定义域名配置
    - 全面的验证清单

## 🚀 立即开始部署

### 方法一：自动部署（推荐）

您的项目已经配置好自动部署，只需：

1. 推送代码到 `main` 分支
2. GitHub Actions 会自动构建和部署
3. 等待 3-5 分钟即可访问网站

### 方法二：手动触发部署

```bash
# 构建并推送
pnpm build:docs
git add .
git commit -m "docs: 更新文档"
git push origin main
```

## ⚙️ 首次设置 GitHub Pages

如果这是您第一次部署，请按照以下步骤：

### 1. 启用 GitHub Pages

1. 访问：`https://github.com/fucktic/ant-design-plus`
2. 点击 **Settings** 标签
3. 在左侧找到 **Pages** 选项
4. 在 **Source** 中选择 **GitHub Actions**
5. 点击 **Save** 保存

### 2. 等待部署完成

-   查看 **Actions** 标签监控部署进度
-   首次部署需要 5-10 分钟
-   完成后访问：`https://fucktic.github.io/ant-design-plus/`

## 📞 需要帮助？

-   📖 **详细步骤**：查看 `DETAILED_GITHUB_PAGES_SETUP.md`
-   🔧 **故障排除**：查看 `GITHUB_PAGES_DEPLOYMENT.md`
-   🚨 **紧急问题**：检查 GitHub Actions 日志

---

**部署状态**: ✅ 已配置  
**预计完成时间**: 5-10 分钟  
**文档地址**: https://fucktic.github.io/ant-design-plus/

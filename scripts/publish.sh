#!/bin/bash

# 发布脚本
set -e

echo "🚀 开始发布流程..."

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ 存在未提交的更改，请先提交所有更改"
  exit 1
fi

# 构建组件库
echo "📦 构建组件库..."
cd packages/components
pnpm build
cd ../..

# 构建文档
echo "📚 构建文档..."
cd packages/docs
pnpm build
cd ../..

# 运行测试（如果有的话）
echo "🧪 运行测试..."
# pnpm test

# 创建 changeset
echo "📝 创建版本变更记录..."
pnpm changeset

# 版本升级
echo "⬆️ 升级版本..."
pnpm changeset version

# 发布到 NPM
echo "🚀 发布到 NPM..."
cd packages/components
pnpm publish --access public
cd ../..

# 提交版本变更
echo "💾 提交版本变更..."
git add .
git commit -m "chore: release new version"
git push

echo "✅ 发布完成！"
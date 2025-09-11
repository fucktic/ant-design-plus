#!/bin/bash

# Ant Design Plus 项目设置脚本

echo "🚀 开始设置 Ant Design Plus 项目..."

# 检查 Node.js 版本
echo "📋 检查环境..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ 需要 Node.js 18 或更高版本，当前版本: $(node -v)"
    exit 1
fi

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 安装 pnpm..."
    npm install -g pnpm
fi

echo "✅ 环境检查通过"

# 安装依赖
echo "📦 安装项目依赖..."
pnpm install

# 构建组件库
echo "🔨 构建组件库..."
pnpm build

# 构建文档站点
echo "📚 构建文档站点..."
pnpm build:docs

echo "✅ 项目设置完成！"
echo ""
echo "🎉 可用命令："
echo "  pnpm dev          - 启动开发服务器"
echo "  pnpm build        - 构建组件库"
echo "  pnpm build:docs   - 构建文档站点"
echo "  pnpm lint         - 代码检查"
echo "  pnpm changeset    - 添加变更记录"
echo ""
echo "📖 查看 RELEASE.md 了解更多信息"
echo "🌐 访问 http://localhost:3000/ant-design-plus/ 查看文档"
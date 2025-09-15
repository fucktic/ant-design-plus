# ModalColumnCustom 文档

## 概述

ModalColumnCustom 是一个功能完整的表格列自定义组件，已成功集成到组件库中。

## 文件结构

```
ModalColumnCustomDemo/
├── index.tsx          # 主文档页面
├── test.tsx           # 简单测试组件
└── README.md          # 说明文档
```

## 功能特性

- ✅ 列选择和取消选择
- ✅ 搜索过滤功能
- ✅ 拖拽排序（基于 TableDragHandle）
- ✅ 批量操作（全选、清空）
- ✅ 禁用状态支持
- ✅ 异步提交处理
- ✅ ref 方法调用

## 路由配置

- 路径: `/feedback/modal-column-custom`
- 分组: 反馈组件
- 导航: 侧边栏 "反馈" -> "ModalColumnCustom 自定义列"

## 示例代码

文档包含三个主要示例：

1. **基础用法** - 展示基本的列选择功能
2. **大量选项** - 演示搜索过滤和批量操作
3. **异步提交和事件回调** - 展示 ref 使用和异步处理

## 访问方式

1. 启动文档服务: `npm run dev`
2. 访问: `http://localhost:5173/feedback/modal-column-custom`
3. 或通过侧边栏导航访问

## 组件依赖

- ant-design-plus-ui (组件库)
- TableDragHandle (拖拽功能)
- Antd (UI 组件)
- React (框架)
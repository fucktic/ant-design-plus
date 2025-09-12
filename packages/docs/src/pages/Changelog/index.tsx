import React from 'react'
import { Typography, Timeline, Tag, theme } from 'antd'

const { Title, Paragraph, Text } = Typography

const Changelog: React.FC = () => {
    const { token } = theme.useToken()

    return (
        <div>
            <div
                className="sticky top-0 backdrop-blur-sm border-b p-6 z-10"
                style={{
                    backgroundColor: token.colorBgContainer,
                    borderBottomColor: token.colorBorder,
                }}
            >
                <Title
                    level={1}
                    style={{ margin: 0, marginBottom: '8px' }}
                >
                    更新日志
                </Title>
                <Paragraph style={{ margin: 0 }}>
                    记录 Ant Design + 组件库的版本更新和功能变化。
                </Paragraph>
            </div>

            <div className="p-6">
                <Timeline
                    items={[
                        {
                            children: (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Text strong>v1.3.3</Text>
                                        <Tag color="blue">Latest</Tag>
                                        <Text type="secondary">2025-09-12</Text>
                                    </div>
                                    <div className="mb-3">
                                        <Text strong>🚀 Scrollbar 组件重大优化</Text>
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>
                                            🎨 <Text strong>滑块颜色优化</Text>：使用 opacity 控制
                                            hover 效果，避免默认色覆盖
                                        </li>
                                        <li>
                                            🎯 <Text strong>视觉体验提升</Text>：轨道比滑块宽/高
                                            2px，滑块居中显示
                                        </li>
                                        <li>
                                            🏗️ <Text strong>架构重构</Text>：模块化设计，提取自定义
                                            hooks
                                        </li>
                                        <li>
                                            ⚡ <Text strong>性能优化</Text>：使用
                                            useMemo、useCallback 减少重渲染
                                        </li>
                                        <li>
                                            🔧 <Text strong>代码质量</Text>：统一常量管理，完善
                                            TypeScript 类型
                                        </li>
                                        <li>
                                            📱 <Text strong>响应式适配</Text>
                                            ：移动端自动使用更小滚动条
                                        </li>
                                        <li>
                                            ♿ <Text strong>无障碍支持</Text>
                                            ：高对比度和减少动画偏好
                                        </li>
                                        <li>
                                            📚 <Text strong>完整文档</Text>：新增详细的 README
                                            和使用说明
                                        </li>
                                    </ul>
                                </div>
                            ),
                        },
                        {
                            children: (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Text strong>v1.0.0</Text>
                                        <Tag color="green">Stable</Tag>
                                        <Text type="secondary">2025-09-11</Text>
                                    </div>
                                    <div className="mb-3">
                                        <Text strong>🎉 首次发布</Text>
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>✨ 新增 Scrollbar 滚动条组件，支持自定义样式</li>
                                        <li>🔧 基于 Vite 7.1.5 构建系统</li>
                                        <li>🔧 支持 React 19 和 TypeScript</li>
                                        <li>🔧 集成 Ant Design 5.27.3</li>
                                        <li>📚 完整的文档站点和示例代码</li>
                                        <li>🚀 支持 NPM 发布和 GitHub Pages 部署</li>
                                    </ul>
                                </div>
                            ),
                        },
                        {
                            children: (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Text strong>v0.1.0</Text>
                                        <Tag color="orange">Beta</Tag>
                                        <Text type="secondary">2025-09-10</Text>
                                    </div>
                                    <div className="mb-3">
                                        <Text strong>🚧 项目初始化</Text>
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>🏗️ 项目架构搭建</li>
                                        <li>🏗️ 开发环境配置</li>
                                        <li>🏗️ 基础组件框架</li>
                                        <li>🏗️ 文档站点框架</li>
                                    </ul>
                                </div>
                            ),
                        },
                    ]}
                />

                <div
                    className="mt-8 p-4 rounded-lg"
                    style={{ backgroundColor: token.colorFillQuaternary }}
                >
                    <Title level={4}>版本说明</Title>
                    <Paragraph>
                        <Text strong>版本号规则：</Text>采用语义化版本控制 (Semantic Versioning)
                    </Paragraph>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <Text code>主版本号</Text>：不兼容的 API 修改
                        </li>
                        <li>
                            <Text code>次版本号</Text>：向下兼容的功能性新增
                        </li>
                        <li>
                            <Text code>修订号</Text>：向下兼容的问题修正
                        </li>
                    </ul>

                    <Paragraph className="mt-4">
                        <Text strong>标签说明：</Text>
                    </Paragraph>
                    <div className="flex gap-2 flex-wrap">
                        <Tag color="blue">Latest</Tag>
                        <span>最新稳定版本</span>
                        <Tag color="orange">Beta</Tag>
                        <span>测试版本</span>
                        <Tag color="red">Deprecated</Tag>
                        <span>已废弃版本</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Changelog

/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:19:33
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 15:24:23
 * @Description: Do not edit
 */
import React from 'react'
import { Typography, Card, Row, Col, Button, Space } from 'antd'
import { Link } from 'react-router-dom'
import {
    RocketOutlined,
    ThunderboltOutlined,
    SafetyOutlined,
    GlobalOutlined,
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
    const features = [
        {
            icon: <RocketOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
            title: '开箱即用',
            description: '基于 React 19 和 TypeScript，提供完整的类型支持',
        },
        {
            icon: <ThunderboltOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
            title: '高性能',
            description: '基于 Vite 构建，支持 Tree Shaking，包体积小',
        },
        {
            icon: <SafetyOutlined style={{ fontSize: 32, color: '#faad14' }} />,
            title: '可靠稳定',
            description: '基于 Ant Design 设计语言，经过大量项目验证',
        },
        {
            icon: <GlobalOutlined style={{ fontSize: 32, color: '#722ed1' }} />,
            title: '国际化',
            description: '支持多语言，满足不同地区的使用需求',
        },
    ]

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <Title level={1}>Ant Design +</Title>
                <Paragraph style={{ fontSize: 18, color: '#666' }}>
                    基于 Ant Design 的 React 组件库，提供更多实用的业务组件
                </Paragraph>
                <Space size="large">
                    <Button
                        type="primary"
                        size="large"
                    >
                        <Link to="/components/button">开始使用</Link>
                    </Button>
                    <Button size="large">
                        <a
                            href="https://github.com/your-username/ant-design-plus"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </Button>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                {features.map((feature, index) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        key={index}
                    >
                        <Card
                            hoverable
                            style={{ textAlign: 'center', height: '100%' }}
                        >
                            <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                            <Title level={4}>{feature.title}</Title>
                            <Paragraph>{feature.description}</Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card style={{ marginTop: 48 }}>
                <Title level={3}>快速开始</Title>
                <Paragraph>使用 npm、yarn 或 pnpm 安装组件库：</Paragraph>
                <div className="code-block">
                    <pre>
                        {`npm install antd-plus
# 或
yarn add antd-plus
# 或
pnpm add antd-plus`}
                    </pre>
                </div>
                <Paragraph style={{ marginTop: 16 }}>在你的项目中使用：</Paragraph>
                <div className="code-block">
                    <pre>
                        {`import { Button } from '@ant-design-plus/ui';

function App() {
  return <Button type="primary">Hello World</Button>;
}`}
                    </pre>
                </div>
            </Card>
        </div>
    )
}

export default Home

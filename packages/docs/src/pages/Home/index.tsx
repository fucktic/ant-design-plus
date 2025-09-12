/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:19:33
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 17:51:15
 * @Description: Do not edit
 */
import React from 'react'
import { Typography, Card, Row, Col, Button, Space, Badge, Divider } from 'antd'
import { Link } from 'react-router-dom'
import {
    RocketOutlined,
    ThunderboltOutlined,
    SafetyOutlined,
    GlobalOutlined,
    StarOutlined,
    GithubOutlined,
    DownloadOutlined,
    CodeOutlined,
} from '@ant-design/icons'
import CodeHighlighter from '../../components/CodeHighlighter'

const { Title, Paragraph, Text } = Typography

const Home: React.FC = () => {
    const features = [
        {
            icon: <RocketOutlined style={{ fontSize: 40, color: '#1890ff' }} />,
            title: '开箱即用',
            description: '基于 React 19 和 TypeScript，提供完整的类型支持和开发体验',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            icon: <ThunderboltOutlined style={{ fontSize: 40, color: '#52c41a' }} />,
            title: '高性能',
            description: '基于 Vite 构建，支持 Tree Shaking，包体积小，加载速度快',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        {
            icon: <SafetyOutlined style={{ fontSize: 40, color: '#faad14' }} />,
            title: '可靠稳定',
            description: '基于 Ant Design 设计语言，经过大量项目验证，质量可靠',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
        {
            icon: <GlobalOutlined style={{ fontSize: 40, color: '#722ed1' }} />,
            title: '国际化',
            description: '支持多语言，满足不同地区的使用需求，覆盖全球用户',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        },
    ]

    const stats = [
        { label: '组件数量', value: '20+', icon: <CodeOutlined /> },
        { label: 'GitHub Stars', value: '1.2k', icon: <StarOutlined /> },
        { label: '周下载量', value: '50k', icon: <DownloadOutlined /> },
    ]

    return (
        <div style={{ overflow: 'hidden' }}>
            {/* Hero Section */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '100px 0 140px',
                    textAlign: 'center',
                    position: 'relative',
                    marginBottom: 100,
                    borderRadius: '0 0 60px 60px',
                    overflow: 'hidden',
                }}
            >
                {/* 装饰性背景元素 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '8%',
                        width: 120,
                        height: 120,
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '50%',
                        animation: 'float 6s ease-in-out infinite',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '65%',
                        right: '12%',
                        width: 80,
                        height: 80,
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '50%',
                        animation: 'float 4s ease-in-out infinite reverse',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '30%',
                        right: '25%',
                        width: 40,
                        height: 40,
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: '50%',
                        animation: 'float 8s ease-in-out infinite',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '20%',
                        width: 60,
                        height: 60,
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: '50%',
                        animation: 'float 5s ease-in-out infinite reverse',
                    }}
                />

                <Badge.Ribbon
                    text="v1.0.0"
                    color="gold"
                    style={{ top: -10, right: -10 }}
                >
                    <Title
                        level={1}
                        className="hero-title"
                        style={{
                            color: 'white',
                            fontSize: '4rem',
                            fontWeight: 'bold',
                            marginBottom: 24,
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        Ant Design +
                    </Title>
                </Badge.Ribbon>

                <Paragraph
                    className="hero-subtitle"
                    style={{
                        fontSize: 20,
                        color: 'rgba(255, 255, 255, 0.9)',
                        maxWidth: 600,
                        margin: '0 auto 40px',
                        lineHeight: 1.6,
                    }}
                >
                    🚀 基于 Ant Design 的现代化 React 组件库
                    <br />
                    为企业级应用提供更多实用的业务组件
                </Paragraph>

                {/* 统计数据 */}
                <Row
                    gutter={[32, 16]}
                    style={{ marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}
                >
                    {stats.map((stat, index) => (
                        <Col
                            span={8}
                            key={index}
                        >
                            <div style={{ color: 'white', textAlign: 'center' }}>
                                <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                                <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 4 }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: 14, opacity: 0.8 }}>{stat.label}</div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <Space
                    size="large"
                    className="hero-buttons"
                >
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            height: 50,
                            padding: '0 32px',
                            fontSize: 16,
                            borderRadius: 25,
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                        }}
                        icon={<RocketOutlined />}
                    >
                        <Link
                            to="/components/button"
                            style={{ color: 'white' }}
                        >
                            开始使用
                        </Link>
                    </Button>
                    <Button
                        size="large"
                        style={{
                            height: 50,
                            padding: '0 32px',
                            fontSize: 16,
                            borderRadius: 25,
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                        }}
                        icon={<GithubOutlined />}
                        onClick={() =>
                            window.open('https://github.com/fucktic/ant-design-plus', '_blank')
                        }
                    >
                        GitHub
                    </Button>
                </Space>
            </div>

            {/* Features Section */}
            <div style={{ padding: '0 24px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 80 }}>
                    <Title
                        level={2}
                        style={{
                            fontSize: '3rem',
                            marginBottom: 24,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        ✨ 核心特性
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: 20,
                            color: '#666',
                            maxWidth: 700,
                            margin: '0 auto',
                            lineHeight: 1.8,
                        }}
                    >
                        我们致力于提供最优秀的开发体验和用户体验，让每一个开发者都能轻松构建出色的应用
                    </Paragraph>
                </div>

                <Row gutter={[32, 32]}>
                    {features.map((feature, index) => (
                        <Col
                            xs={24}
                            sm={12}
                            lg={6}
                            key={index}
                            className="feature-card"
                        >
                            <Card
                                hoverable
                                style={{
                                    textAlign: 'center',
                                    height: '100%',
                                    borderRadius: 20,
                                    border: 'none',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    overflow: 'hidden',
                                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                                }}
                                styles={{ body: { padding: 40 } }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-12px) scale(1.02)'
                                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)'
                                }}
                            >
                                <div
                                    style={{
                                        marginBottom: 24,
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: feature.gradient,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 24px',
                                        color: 'white',
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: 16, fontSize: '1.25rem' }}
                                >
                                    {feature.title}
                                </Title>
                                <Paragraph style={{ color: '#666', lineHeight: 1.6 }}>
                                    {feature.description}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Divider style={{ margin: '80px 0' }} />

            {/* Quick Start Section */}
            <div style={{ padding: '0 24px', maxWidth: 1000, margin: '0 auto 80px' }}>
                <Card
                    style={{
                        borderRadius: 16,
                        border: 'none',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                    styles={{ body: { padding: 40 } }}
                >
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <Title
                            level={2}
                            style={{ fontSize: '2rem', marginBottom: 16 }}
                        >
                            🚀 快速开始
                        </Title>
                        <Paragraph style={{ fontSize: 16, color: '#666' }}>
                            只需几个简单步骤，即可在您的项目中使用 Ant Design +
                        </Paragraph>
                    </div>

                    <Row gutter={[40, 40]}>
                        <Col
                            xs={24}
                            lg={12}
                        >
                            <div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: 16, color: '#1890ff' }}
                                >
                                    📦 安装组件库
                                </Title>
                                <Text
                                    type="secondary"
                                    style={{ marginBottom: 16, display: 'block' }}
                                >
                                    使用您喜欢的包管理器安装：
                                </Text>
                                <CodeHighlighter
                                    code={`npm install ant-design-plus-ui
# 或
yarn add ant-design-plus-ui
# 或
pnpm add ant-design-plus-ui`}
                                    language="bash"
                                />
                            </div>
                        </Col>
                        <Col
                            xs={24}
                            lg={12}
                        >
                            <div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: 16, color: '#52c41a' }}
                                >
                                    💻 开始使用
                                </Title>
                                <Text
                                    type="secondary"
                                    style={{ marginBottom: 16, display: 'block' }}
                                >
                                    在您的 React 项目中导入并使用：
                                </Text>
                                <CodeHighlighter
                                    code={`import { Button } from 'ant-design-plus-ui';

function App() {
  return (
    <Button type="primary">
      Hello Ant Design +
    </Button>
  );
}`}
                                    language="tsx"
                                />
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>

            {/* 添加 CSS 动画 */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                
                @keyframes slideInUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInScale {
                    from {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                .feature-card {
                    animation: slideInUp 0.6s ease-out;
                }
                
                .feature-card:nth-child(1) { animation-delay: 0.1s; }
                .feature-card:nth-child(2) { animation-delay: 0.2s; }
                .feature-card:nth-child(3) { animation-delay: 0.3s; }
                .feature-card:nth-child(4) { animation-delay: 0.4s; }
                
                .hero-title {
                    animation: fadeInScale 1s ease-out;
                }
                
                .hero-subtitle {
                    animation: slideInUp 1s ease-out 0.3s both;
                }
                
                .hero-buttons {
                    animation: slideInUp 1s ease-out 0.6s both;
                }
            `}</style>
        </div>
    )
}

export default Home

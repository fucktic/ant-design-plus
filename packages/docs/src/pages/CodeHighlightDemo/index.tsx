/**
 * 代码高亮演示页面
 * 展示新的代码高亮功能
 */

import React from 'react'
import { Typography, Space } from 'antd'
import CodeHighlighter from '../../components/CodeHighlighter'

const { Title, Paragraph } = Typography

const CodeHighlightDemo: React.FC = () => {
    const reactCode = `import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserComponent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
            message.success('用户数据加载成功');
        } catch (error) {
            message.error('加载失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>用户列表</h2>
            <Space direction="vertical" style={{ width: '100%' }}>
                {users.map(user => (
                    <Card key={user.id} size="small">
                        <p><strong>姓名:</strong> {user.name}</p>
                        <p><strong>邮箱:</strong> {user.email}</p>
                    </Card>
                ))}
            </Space>
            <Button 
                type="primary" 
                loading={loading} 
                onClick={fetchUsers}
                style={{ marginTop: 16 }}
            >
                刷新数据
            </Button>
        </div>
    );
};

export default UserComponent;`

    const cssCode = `.user-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.user-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.user-name {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 8px;
}

.user-email {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.9;
}

@media (max-width: 768px) {
    .user-card {
        padding: 16px;
        margin-bottom: 12px;
    }
    
    .user-name {
        font-size: 16px;
    }
}`

    const jsonCode = `{
  "name": "@antd-plus",
  "version": "1.0.0",
  "description": "Enhanced Ant Design components with additional features",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    '@ant-design-plus/ui': "^5.27.3",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@types/react": "^19.1.1",
    "@types/react-dom": "^19.1.1",
    "typescript": "~5.7.2"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}`

    return (
        <div style={{ padding: '24px' }}>
            <Title level={1}>代码高亮演示</Title>
            <Paragraph>展示新的代码高亮功能，支持多种语言和主题切换。</Paragraph>

            <Space
                direction="vertical"
                size="large"
                style={{ width: '100%' }}
            >
                <div>
                    <Title level={3}>React/TypeScript 代码</Title>
                    <CodeHighlighter
                        code={reactCode}
                        showThemeSelector={true}
                        showCopyButton={true}
                        showLineNumbers={true}
                    />
                </div>

                <div>
                    <Title level={3}>CSS 样式代码</Title>
                    <CodeHighlighter
                        code={cssCode}
                        language="css"
                        showThemeSelector={true}
                        showCopyButton={true}
                    />
                </div>

                <div>
                    <Title level={3}>JSON 配置文件</Title>
                    <CodeHighlighter
                        code={jsonCode}
                        language="json"
                        showThemeSelector={true}
                        showCopyButton={true}
                    />
                </div>
            </Space>
        </div>
    )
}

export default CodeHighlightDemo

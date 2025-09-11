/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:19:41
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 15:29:35
 * @Description: Do not edit
 */
import React, { useState } from 'react'
import { Card, Button, Divider } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import CodeHighlighter from '../CodeHighlighter'
import './style.css'

interface DemoContainerProps {
    title: string
    description?: string
    children: React.ReactNode
    code?: string
}

const DemoContainer: React.FC<DemoContainerProps> = ({ title, description, children, code }) => {
    const [showCode, setShowCode] = useState(false)

    return (
        <Card
            style={{ marginBottom: 24 }}
            className="demo-container-card"
        >
            <div className="demo-header">
                <div className="demo-info">
                    <div className="demo-title">{title}</div>
                    {description && <div className="demo-description">{description}</div>}
                </div>
                {code && (
                    <div className="demo-actions">
                        <Button
                            type="text"
                            icon={showCode ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            onClick={() => setShowCode(!showCode)}
                            size="small"
                        >
                            {showCode ? '隐藏代码' : '显示代码'}
                        </Button>
                    </div>
                )}
            </div>

            <div className="demo-showcase">{children}</div>

            {code && showCode && (
                <>
                    <Divider style={{ margin: '16px 0' }} />
                    <CodeHighlighter
                        code={code}
                        showThemeSelector={true}
                        showCopyButton={true}
                        className="demo-code-highlighter"
                    />
                </>
            )}
        </Card>
    )
}

export default DemoContainer

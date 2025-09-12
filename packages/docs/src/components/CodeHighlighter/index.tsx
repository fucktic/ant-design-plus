/**
 * 代码高亮组件
 * 基于 react-syntax-highlighter 提供专业的代码高亮功能
 */

import React, { useState } from 'react'
import { Button, Dropdown, Space, message, theme } from 'antd'
import { CopyOutlined, BgColorsOutlined } from '@ant-design/icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
    detectLanguage,
    getThemeStyle,
    defaultHighlightConfig,
    type ThemeName,
} from '../../utils/codeHighlight'
import './style.css'

interface CodeHighlighterProps {
    code: string
    language?: string
    theme?: ThemeName
    showThemeSelector?: boolean
    showCopyButton?: boolean
    showLineNumbers?: boolean
    className?: string
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
    code,
    language,
    theme: themeProp = 'vscDarkPlus',
    showThemeSelector = false,
    showCopyButton = true,
    showLineNumbers = false,
    className = '',
}) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>(themeProp)
    const { token } = theme.useToken()

    const detectedLanguage = language || detectLanguage(code)

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(code)
            message.success('代码已复制到剪贴板')
        } catch {
            message.error('复制失败，请手动复制')
        }
    }

    const themeOptions = [
        { key: 'vscDarkPlus', label: 'VS Code Dark+' },
        { key: 'github', label: 'GitHub Light' },
        { key: 'atomOneDark', label: 'Atom One Dark' },
        { key: 'vs2015', label: 'Visual Studio 2015' },
    ]

    const handleThemeChange = ({ key }: { key: string }) => {
        setCurrentTheme(key as ThemeName)
    }

    return (
        <div
            className={`code-highlighter ${className}`}
            style={{
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadius,
                backgroundColor: token.colorFillQuaternary,
            }}
        >
            {(showThemeSelector || showCopyButton) && (
                <div
                    className="code-highlighter-header"
                    style={{
                        backgroundColor: token.colorFillQuaternary,
                        borderBottom: `1px solid ${token.colorBorder}`,
                    }}
                >
                    <div
                        className="code-language-tag"
                        style={{
                            color: token.colorTextSecondary,
                        }}
                    >
                        {detectedLanguage.toUpperCase()}
                    </div>
                    <Space size="small">
                        {showThemeSelector && (
                            <Dropdown
                                menu={{
                                    items: themeOptions,
                                    onClick: handleThemeChange,
                                    selectedKeys: [currentTheme],
                                }}
                                placement="bottomRight"
                            >
                                <Button
                                    type="text"
                                    icon={<BgColorsOutlined />}
                                    size="small"
                                    className="code-action-btn"
                                    style={{
                                        color: token.colorTextSecondary,
                                    }}
                                >
                                    主题
                                </Button>
                            </Dropdown>
                        )}
                        {showCopyButton && (
                            <Button
                                type="text"
                                icon={<CopyOutlined />}
                                onClick={handleCopyCode}
                                size="small"
                                className="code-action-btn"
                                style={{
                                    color: token.colorTextSecondary,
                                }}
                            >
                                复制
                            </Button>
                        )}
                    </Space>
                </div>
            )}

            <div className="code-highlighter-content">
                <SyntaxHighlighter
                    language={detectedLanguage}
                    style={getThemeStyle(currentTheme)}
                    {...defaultHighlightConfig}
                    showLineNumbers={showLineNumbers}
                    customStyle={{
                        ...defaultHighlightConfig.customStyle,
                        borderRadius: showThemeSelector || showCopyButton ? '0 0 6px 6px' : '6px',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default CodeHighlighter

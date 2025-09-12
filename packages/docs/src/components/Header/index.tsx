/*
 * @Author: xuwei
 * @Date: 2025-09-11 11:01:16
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 15:22:38
 * @Description: Do not edit
 */
import React from 'react'
import { Layout, Button, theme } from 'antd'
import { GithubOutlined, MenuOutlined } from '@ant-design/icons'
import { useTheme } from '../../contexts/ThemeContext'

const { Header: AntHeader } = Layout

interface HeaderProps {
    onMenuClick?: () => void
    showMenuButton?: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenuButton = false }) => {
    const {} = useTheme()
    const { token } = theme.useToken()

    return (
        <AntHeader
            className="shadow-sm !px-4 lg:!px-8"
            style={{
                backgroundColor: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorder}`,
            }}
        >
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    {/* 移动端菜单按钮 */}
                    {showMenuButton && (
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={onMenuClick}
                            className="lg:hidden"
                            style={{
                                color: token.colorTextSecondary,
                            }}
                            title="打开菜单"
                        />
                    )}

                    <a
                        href="https://fucktic.github.io/ant-design-plus/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                        style={{ color: '#1890ff' }}
                    >
                        <img
                            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                            alt="Ant Design +"
                            className="w-8 h-8"
                        />
                        <span style={{ color: token.colorPrimary }}>Ant Design +</span>
                    </a>
                </div>

                {/* 右侧操作区 */}
                <div className="flex items-center space-x-4">
                    {/* GitHub 链接 */}
                    <Button
                        type="text"
                        icon={<GithubOutlined />}
                        href="https://github.com/fucktic/ant-design-plus"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="查看 GitHub 仓库"
                        style={{
                            color: token.colorTextSecondary,
                        }}
                        className="hover:bg-blue-50"
                    />
                </div>
            </div>
        </AntHeader>
    )
}

export default Header

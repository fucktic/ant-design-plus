import React, { useState, useEffect } from 'react'
import { Menu, Drawer } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import Header from '../Header'

import './style.css'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
    const [isLargeScreen, setIsLargeScreen] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const menuItems = [
        {
            key: '/',
            label: (
                <Link
                    to="/"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                    首页
                </Link>
            ),
        },
        {
            key: '/changelog',
            label: (
                <Link
                    to="/changelog"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                    更新日志
                </Link>
            ),
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'general',
            label: <div>通用</div>,
            type: 'group' as const,
            children: [
                {
                    key: '/components/button',
                    label: (
                        <Link
                            to="/components/button"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        >
                            Button 按钮
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'data-display',
            label: <div>数据展示</div>,
            type: 'group' as const,
            children: [
                {
                    key: '/components/card',
                    label: (
                        <Link
                            to="/components/card"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        >
                            Card 卡片
                        </Link>
                    ),
                },
                {
                    key: '/components/table',
                    label: (
                        <Link
                            to="/components/table"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        >
                            Table 表格
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'data-entry',
            label: <div>数据录入</div>,
            type: 'group' as const,
            children: [
                {
                    key: '/components/form',
                    label: (
                        <Link
                            to="/components/form"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        >
                            Form 表单
                        </Link>
                    ),
                },
            ],
        },
    ]

    const siderContent = (
        <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={['general', 'data-display', 'data-entry']}
            items={menuItems}
            style={{
                border: 'none',
                background: 'transparent',
                fontSize: '14px',
            }}
            className="custom-menu"
        />
    )

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundColor: '#ffffff',
            }}
        >
            {/* 固定头部 */}
            <div
                className="fixed top-0 left-0 right-0 z-50"
                style={{
                    height: '64px',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #f0f0f0',
                }}
            >
                <Header />
            </div>

            <div
                className="flex"
                style={{ paddingTop: '64px' }}
            >
                {/* 固定侧边栏 - 仅在大屏幕显示 */}
                {isLargeScreen && (
                    <div
                        className="fixed left-0 overflow-y-auto"
                        style={{
                            top: '0',
                            bottom: '0',
                            width: '280px',
                            zIndex: 40,
                            paddingTop: '64px',
                            backgroundColor: '#ffffff',
                            borderRight: '1px solid #f0f0f0',
                        }}
                    >
                        <div className="p-4">{siderContent}</div>
                    </div>
                )}

                {/* 移动端抽屉菜单 */}
                <Drawer
                    title="导航菜单"
                    placement="left"
                    onClose={() => setMobileMenuVisible(false)}
                    open={mobileMenuVisible}
                    className="lg:hidden"
                    width={280}
                >
                    <div className="p-2">{siderContent}</div>
                </Drawer>

                {/* 主内容区域 */}
                <div
                    className="flex-1 overflow-y-auto"
                    style={{
                        marginLeft: isLargeScreen ? '280px' : '0',
                        height: 'calc(100vh - 64px)',
                        position: 'relative',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <div className="p-6 lg:p-8">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout

/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:19:12
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-12 16:35:19
 * @Description: Do not edit
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'
import './index.css'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename="/ant-design-plus">
            <ThemeProvider>
                <ConfigProvider
                    theme={{
                        cssVar: true,
                        hashed: false,
                    }}
                >
                    <App />
                </ConfigProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)

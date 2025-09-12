/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:19:16
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 13:46:29
 * @Description: Do not edit
 */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Changelog from './pages/Changelog'
import ScrollbarDemo from './pages/components/ScrollbarDemo'
import CodeHighlightDemo from './pages/CodeHighlightDemo'

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/changelog"
                        element={<Changelog />}
                    />
                    <Route
                        path="/code-highlight"
                        element={<CodeHighlightDemo />}
                    />
                    <Route
                        path="/components/scrollbar"
                        element={<ScrollbarDemo />}
                    />
                </Routes>
            </Layout>
        </ThemeProvider>
    )
}

export default App

/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:19:16
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-12 16:55:39
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
import TwoTierCascaderDemo from './pages/components/TwoTierCascaderDemo'
import TableDragHandleDemo from './pages/components/TableDragHandleDemo'
import ModalColumnCustomDemo from './pages/components/ModalColumnCustomDemo'

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
                        path="/other/scrollbar"
                        element={<ScrollbarDemo />}
                    />
                    <Route
                        path="/form/two-tier-cascader"
                        element={<TwoTierCascaderDemo />}
                    />
                    <Route
                        path="/data-display/table-drag-handle"
                        element={<TableDragHandleDemo />}
                    />
                    <Route
                        path="/feedback/modal-column-custom"
                        element={<ModalColumnCustomDemo />}
                    />
                </Routes>
            </Layout>
        </ThemeProvider>
    )
}

export default App

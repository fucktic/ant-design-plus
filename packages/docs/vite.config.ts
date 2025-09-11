/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:16:20
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 14:14:43
 * @Description: Do not edit
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/ant-design-plus',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    server: {
        port: 3000,
        open: true,
    },
})
